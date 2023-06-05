import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { localPort } from '@/utils/constants'
import SideBar from '../../../../../components/SideBar'
import MessageBlock, { MsgProps } from '../../../../../components/MessageBlock'
import InputBox from '../../../../../components/InputBox'

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async () => {
  try {
    const cRes = await fetch(`${localPort}/channels/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const channels = await cRes.json()
    return { props: { channels } }
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

export default function ChannelComp({
  channels,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const [channel, setChannel] = useState('')
  const [chatList, setChat] = useState<MsgProps[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)
  const channelID = router.query.channelCode
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [chatList])

  const onPostMessage = (res: {
    _id: string
    content: string
    sender: { _id: string; userName: string }
  }) => {
    setChat((prevChat: MsgProps[]) => {
      return [
        ...prevChat,
        {
          id: res._id,
          content: res.content,
          responses: [],
          reactions: {
            Check: [],
            Favorite: [],
            Moodbad: [],
            Thumbup: [],
          },
          sender: { id: res.sender._id, name: res.sender.userName },
          isFile: false,
        },
      ]
    })
  }

  // TODO: not updating immediately
  const onDeleteMessage = (res: {
    _id: string
    content: string
    isFile: boolean
  }) => {
    setChat((prevChat: MsgProps[]) => {
      const index0 = prevChat.findIndex((c) => c.id === res._id)
      const index1 = prevChat.findIndex((c) => {
        const filterResponse =
          c.responses?.filter((r) => r.id === res._id) ?? []
        return filterResponse.length > 0
      })
      if (index1 && prevChat[index1]) {
        const indexResponse = prevChat[index1].responses?.findIndex(
          (r) => r.id === res._id,
        )
        const newChatList = [
          ...prevChat.slice(0, index1),
          ...prevChat.slice(index1 + 1),
        ]
        const responseIndex1 = prevChat[index1].responses
        const newChat =
          indexResponse && indexResponse >= 0 && responseIndex1
            ? {
                ...prevChat[index1],
                responses: [
                  ...responseIndex1.slice(0, indexResponse),
                  {
                    ...responseIndex1[indexResponse],
                    content: res.content,
                  },
                  ...responseIndex1.slice(indexResponse + 1),
                ],
              }
            : {
                ...prevChat[index1],
              }

        newChatList.splice(index1, 0, newChat)
        return JSON.parse(JSON.stringify(newChatList))
      }

      if (index0 >= 0) {
        return prevChat.map((c) =>
          c.id === res._id
            ? {
                ...res,
                // id: res._id,
                responses: c.responses,
                reactions: c.reactions,
                sender: c.sender,
              }
            : c,
        )
      }
      return { ...prevChat }
    })
  }

  // TODO: not updating immediately
  const onEditMessage = (res: {
    _id: string
    content: string
    isFile: boolean
  }) => {
    setChat((prevChat: MsgProps[]) => {
      const index0 = prevChat.findIndex((c) => c.id === res._id)
      if (index0 >= 0) {
        return prevChat.map((c) =>
          c.id === res._id
            ? {
                ...res,
                id: res._id,
                responses: c.responses,
                reactions: c.reactions,
                sender: c.sender,
              }
            : c,
        )
      }
      return { ...prevChat }
    })
  }

  const onAddReaction = (res: {
    chatId: string
    reaction: {
      reactionType: string
      reactor: { _id: string; userName: string }
      _id: string
    }
  }) => {
    setChat((prevChat: MsgProps[]) => [
      ...prevChat.filter((c) => c.id !== res.chatId),
      {
        ...prevChat.filter((c) => c.id === res.chatId)[0],
        reactions: {
          ...prevChat.filter((c) => c.id === res.chatId)[0].reactions,
          [res.reaction.reactionType]: [
            ...prevChat.filter((c) => c.id === res.chatId)[0].reactions[
              res.reaction.reactionType
            ],
            {
              id: res.reaction._id,
              userID: res.reaction.reactor._id,
              userName: res.reaction.reactor.userName,
            },
          ],
        },
      },
    ])
  }

  const onDeleteReaction = () => {}

  // const onDeleteReaction = (res: any) => {
  //   console.log('DELETED REACTION')
  //   console.log(res)
  // } // TODO: after socket is fixed

  const onAddResponse = (res: {
    respondedChatId: string
    response: {
      content: string
      isDeleted: boolean
      sender: { _id: string; userName: string }
      _id: string
      isFile: boolean
    }
  }) => {
    setChat((prevChat: MsgProps[]) => {
      if (!prevChat) {
        return prevChat
      }
      const index = prevChat.findIndex((c) => c.id === res.respondedChatId)
      const newChatList = [
        ...prevChat.slice(0, index),
        ...prevChat.slice(index + 1),
      ]
      const newChat = {
        ...prevChat[index],
        responses: [
          ...(prevChat[index].responses ?? []),
          {
            id: res.response._id,
            content: res.response.content,
            reactions: { Check: [], Favorite: [], Moodbad: [], Thumbup: [] },
            sender: {
              id: res.response.sender._id,
              name: res.response.sender.userName,
            },
            isFile: res.response.isFile,
          },
        ],
      }
      newChatList.splice(index, 0, newChat)
      return newChatList
    })
  } // TODO: needed for increamenting responses length

  // const onDeleteResponse = () => {} // TODO: after socket is fixed

  useEffect(() => {
    const skt = io(localPort)
    setSocket(skt)
    scrollToBottom()
    return () => {
      skt.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!socket) {
      return
    }
    const id = localStorage.getItem('_id')
    if (!id) {
      router.push('/')
    }
    socket.emit('connection')
    socket.emit('init', { userId: id })
    socket.on('postMessage', onPostMessage)
    socket.on('deleteMessage', onDeleteMessage)
    socket.on('editMessage', onEditMessage)
    socket.on('addReaction', onAddReaction)
    socket.on('deleteReaction', onDeleteReaction)
    socket.on('addResponse', onAddResponse)
  }, [socket, router])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${localPort}/chats/${channelID}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()
        setChat(
          data.map(
            (d: {
              _id: string
              content: string
              channel: string
              responses_info: {
                _id: string
                content: string
                channel: string
                reactions_info: {
                  reactionType: string
                  user_info: { _id: string; userName: string }[]
                }[]
                sender_info: { _id: string; userName: string }[]
                isFile: boolean
              }[]
              reactions_info: {
                reactionType: string
                user_info: { _id: string; userName: string }[]
              }[]
              sender_info: { _id: string; userName: string }[]
              isFile: boolean
            }) => {
              return {
                id: d._id /* eslint no-underscore-dangle: 0 */,
                content: d.content,
                responses: d.responses_info.map(
                  (r: {
                    _id: string
                    content: string
                    channel: string
                    reactions_info: {
                      reactionType: string
                      user_info: { _id: string; userName: string }[]
                    }[]
                    sender_info: { _id: string; userName: string }[]
                    isFile: boolean
                  }) => ({
                    id: r._id,
                    content: r.content,
                    responses: [],
                    reactions: {
                      Check:
                        r.reactions_info
                          .find(
                            (e: {
                              reactionType: string
                              user_info: { _id: string; userName: string }[]
                            }) => e.reactionType === 'Check',
                          )
                          ?.user_info.map(
                            (u: { _id: string; userName: string }) => ({
                              userID: u._id,
                              userName: u.userName,
                            }),
                          ) || [],
                      Favorite:
                        r.reactions_info
                          .find(
                            (e: {
                              reactionType: string
                              user_info: { _id: string; userName: string }[]
                            }) => e.reactionType === 'Favorite',
                          )
                          ?.user_info.map(
                            (u: { _id: string; userName: string }) => ({
                              userID: u._id,
                              userName: u.userName,
                            }),
                          ) || [],
                      Moodbad:
                        r.reactions_info
                          .find(
                            (e: {
                              reactionType: string
                              user_info: { _id: string; userName: string }[]
                            }) => e.reactionType === 'Moodbad',
                          )
                          ?.user_info.map(
                            (u: { _id: string; userName: string }) => ({
                              userID: u._id,
                              userName: u.userName,
                            }),
                          ) || [],
                      Thumbup:
                        r.reactions_info
                          .find(
                            (e: {
                              reactionType: string
                              user_info: { _id: string; userName: string }[]
                            }) => e.reactionType === 'Thumbup',
                          )
                          ?.user_info.map(
                            (u: { _id: string; userName: string }) => ({
                              userID: u._id,
                              userName: u.userName,
                            }),
                          ) || [],
                    },
                    sender: {
                      id: r.sender_info ? r.sender_info[0]._id : 'unknown id',
                      name: r.sender_info
                        ? r.sender_info[0].userName
                        : 'unknown user',
                    },
                    isFile: r.isFile,
                  }),
                ),
                reactions: {
                  Check:
                    d.reactions_info
                      .find(
                        (e: {
                          reactionType: string
                          user_info: { _id: string; userName: string }[]
                        }) => e.reactionType === 'Check',
                      )
                      ?.user_info.map(
                        (u: { _id: string; userName: string }) => ({
                          userID: u._id,
                          userName: u.userName,
                        }),
                      ) || [],
                  Favorite:
                    d.reactions_info
                      .find(
                        (e: {
                          reactionType: string
                          user_info: { _id: string; userName: string }[]
                        }) => e.reactionType === 'Favorite',
                      )
                      ?.user_info.map(
                        (u: { _id: string; userName: string }) => ({
                          userID: u._id,
                          userName: u.userName,
                        }),
                      ) || [],
                  Moodbad:
                    d.reactions_info
                      .find(
                        (e: {
                          reactionType: string
                          user_info: { _id: string; userName: string }[]
                        }) => e.reactionType === 'Moodbad',
                      )
                      ?.user_info.map(
                        (u: { _id: string; userName: string }) => ({
                          userID: u._id,
                          userName: u.userName,
                        }),
                      ) || [],
                  Thumbup:
                    d.reactions_info
                      .find(
                        (e: {
                          reactionType: string
                          user_info: { _id: string; userName: string }[]
                        }) => e.reactionType === 'Thumbup',
                      )
                      ?.user_info.map(
                        (u: { _id: string; userName: string }) => ({
                          userID: u._id,
                          userName: u.userName,
                        }),
                      ) || [],
                },
                sender: {
                  id: d.sender_info ? d.sender_info[0]._id : 'unknown id',
                  name: d.sender_info
                    ? d.sender_info[0].userName
                    : 'unknown user',
                },
                isFile: d.isFile,
              }
            },
          ),
        )
        setChannel(() => {
          const filteredList = channels.filter(
            (ch: { _id: string; name: string }) => ch._id === channelID,
          )
          const filteredChannel = filteredList[0]
          return filteredChannel.name
        })
      } catch (err) {
        router.push('/')
      }
    }
    getData()
  }, [router, channelID, channels])

  if (chatList.length === 0 || socket === null) {
    return <div></div>
  }
  return (
    <SideBar>
      <Stack spacing={2} sx={{ height: '90vh', display: 'flex' }}>
        <Typography variant="h3">{channel}</Typography>
        <Stack
          sx={{
            flexGrow: 1,
            overflowY: 'scroll',
          }}
        >
          {chatList.map((msg: MsgProps) => (
            <MessageBlock key={msg.id} message={msg} respond socket={socket} />
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <InputBox channelID={String(channelID)} respond="" socket={socket} />
      </Stack>
    </SideBar>
  )
}

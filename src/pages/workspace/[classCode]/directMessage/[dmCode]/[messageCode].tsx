import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import Divider from '@mui/material/Divider'
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

export default function ChannelRespComp({
  channels,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const [channel, setChannel] = useState('')
  const [chat, setChat] = useState<MsgProps>({
    id: '',
    content: '',
    responses: [],
    reactions: { Check: [], Favorite: [], Moodbad: [], Thumbup: [] },
    sender: { id: '', name: '' },
  })
  const [socket, setSocket] = useState<Socket | null>(null)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const dmID = router.query.dmCode
  const msgID = router.query.messageCode

  const onAddResponse = (res: {
    chatId: string
    sender: string
    content: string
  }) => {
    setChat((prevChat: MsgProps) => {
      if (res.chatId === prevChat.id) {
        return prevChat
      }
      return {
        ...prevChat,
        responses: [
          ...(prevChat.responses ? prevChat.responses : []),
          {
            id: '10',
            content: res.content,
            reactions: { Check: [], Favorite: [], Moodbad: [], Thumbup: [] },
            sender: { id: '100', name: res.sender },
          },
        ],
      }
    })
  }

  const onDeleteMessage = (res: { messageId: string; content: string }) => {
    setChat((prevChat: MsgProps) => {
      if (!prevChat) {
        return {
          id: '',
          content: '',
          responses: [],
          reactions: { Check: [], Favorite: [], Moodbad: [], Thumbup: [] },
          sender: { id: '', name: '' },
        }
      }
      if (prevChat.id === res.messageId) {
        return {
          ...prevChat,
          content: res.content,
        }
      }
      if (
        prevChat.responses &&
        prevChat.responses.filter((c) => c.id === res.messageId)
      ) {
        return {
          ...prevChat,
          responses: [
            ...prevChat.responses,
            {
              ...prevChat.responses.filter((c) => c.id === res.messageId)[0],
              content: res.content,
            },
          ],
        }
      }
      return prevChat
    })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [chat])

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
    socket.on('addResponse', onAddResponse)
    socket.on('deleteMessage', onDeleteMessage)
  }, [socket, router])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${localPort}/chats/${dmID}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()
        const filterData = data.filter(
          (d: {
            _id: string
            content: string
            channel: string
            responses: string[]
            reactions: string[]
            sender: { _id: string; userId: string; userName: string }
          }) => {
            return d._id === msgID
          },
        )[0]
        setChat({
          id: filterData._id /* eslint no-underscore-dangle: 0 */,
          content: filterData.content,
          responses: filterData.responses,
          reactions: {
            Check: [],
            Favorite: [],
            Moodbad: [],
            Thumbup: [],
          },
          sender: {
            id: filterData.sender._id,
            name: filterData.sender.userName,
          },
        })
        setChannel(() => {
          const filteredList = channels.filter(
            (ch: {
              _id: string
              name: string
              description: string
              owner: string[]
              members: string[]
            }) => ch._id === dmID,
          )
          const filteredChannel = filteredList[0]
          return filteredChannel.name
        })
      } catch (err) {
        router.push('/')
      }
    }
    getData()
  }, [router, channels, dmID, msgID])

  if (chat.id === '' || socket === null) {
    return <div></div>
  }

  return (
    <SideBar>
      <Stack
        direction="column"
        spacing={2}
        sx={{ height: '90vh', display: 'flex' }}
      >
        <Typography variant="h3">{channel}</Typography>
        <Stack
          sx={{
            flexGrow: 1,
            overflowY: 'scroll',
          }}
        >
          <MessageBlock message={chat} respond={false} socket={socket} />
          <Divider orientation="horizontal" flexItem />
          <div style={{ paddingLeft: '50px' }}>
            <Stack direction="column" spacing={2}>
              <div>Responses</div>
              {chat.responses &&
                chat.responses.map((msg: MsgProps) => (
                  <MessageBlock
                    key={msg.id}
                    message={msg}
                    respond={false}
                    socket={socket}
                  />
                ))}
              <div ref={messagesEndRef} />
            </Stack>
          </div>
        </Stack>
        <InputBox channelID={String(dmID)} respond socket={socket} />
      </Stack>
    </SideBar>
  )
}

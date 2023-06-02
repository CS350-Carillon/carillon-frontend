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
  const dmID = router.query.dmCode
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [chatList])

  const onPostMessage = (res: { sender: string; content: string }) => {
    setChat((prevChat: MsgProps[]) => {
      return [
        ...prevChat,
        {
          id: '1',
          content: res.content,
          responses: [],
          reactions: {
            Check: [],
            Favorite: [],
            Moodbad: [],
            Thumbup: [],
          },
          sender: { id: '1', name: res.sender },
        },
      ]
    })
  }

  const onDeleteMessage = (res: { messageId: string; content: string }) => {
    setChat((prevChat: MsgProps[]) => {
      return [
        ...prevChat.filter((c) => c.id !== res.messageId),
        {
          ...prevChat.filter((c) => c.id === res.messageId)[0],
          content: res.content,
        },
      ]
    })
  }

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
        setChat(
          data.map(
            (d: {
              _id: string
              content: string
              channel: string
              responses: string[]
              reactions: string[]
              sender: { _id: string; userId: string; userName: string }
            }) => {
              return {
                id: d._id /* eslint no-underscore-dangle: 0 */,
                content: d.content,
                responses: d.responses,
                reactions: {
                  Check: [],
                  Favorite: [],
                  Moodbad: [],
                  Thumbup: [],
                },
                sender: { id: d.sender._id, name: d.sender.userName },
              }
            },
          ),
        )
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
  }, [router, channels, dmID])

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
        <InputBox channelID={String(dmID)} respond="" socket={socket} />
      </Stack>
    </SideBar>
  )
}

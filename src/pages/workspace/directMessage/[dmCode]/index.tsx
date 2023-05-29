import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { localPort } from '@/utils/constants'
import SideBar from '../../../../components/SideBar'
import MessageBlock, { MsgProps } from '../../../../components/MessageBlock'
import InputBox from '../../../../components/InputBox'

export default function DmComp() {
  const router = useRouter()
  // const [token, setToken] = useState('')
  // const [id, setId] = useState('')
  const [chatList, setChat] = useState<MsgProps[]>([])

  useEffect(() => {
    // const t = localStorage.getItem('token')
    // const i = localStorage.getItem('_id')
    // if (false) {
    // router.push('/')
    // } else {
    // setToken(t)
    // setId(i)
    const getData = async () => {
      try {
        const res = await fetch(`${localPort}/chats`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // token: t,
          },
        })
        const data = await res.json()
        setChat([
          {
            chatID: data[0]._id /* eslint no-underscore-dangle: 0 */,
            chatContent: data[0].content,
            chatReaction: {
              check: [],
              favorite: [],
              moodbad: [],
              thumbup: [],
            },
            chatSender: { name: 'empty sender' },
            reply: data[0].responses,
          },
        ])
      } catch (err) {
        router.push('/')
      }
    }
    getData()
    // }
  }, [router])

  return (
    <SideBar>
      <Stack spacing={2} sx={{ height: '90vh', display: 'flex' }}>
        <Typography variant="h3"> DM Name {router.query.dmCode} </Typography>
        <Stack
          sx={{
            flexGrow: 1,
            overflowY: 'scroll',
          }}
        >
          {chatList.map((msg: MsgProps) => (
            <MessageBlock key={msg.chatID} message={msg} respond />
          ))}
        </Stack>
        <InputBox />
      </Stack>
    </SideBar>
  )
}

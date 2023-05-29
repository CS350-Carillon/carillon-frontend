import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { localPort } from '@/utils/constants'
import SideBar from '../../../../components/SideBar'
import MessageBlock, { MsgProps } from '../../../../components/MessageBlock'
import InputBox from '../../../../components/InputBox'

export default function DmRespComp() {
  const router = useRouter()
  // const [token, setToken] = useState('')
  // const [id, setId] = useState('')
  const [chat, setChat] = useState<MsgProps>({
    chatID: '',
    chatContent: '',
    chatReaction: { check: [], favorite: [], moodbad: [], thumbup: [] },
    chatSender: { name: '' },
    reply: [],
  })

  const [response, setResponse] = useState<MsgProps[]>([])

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
        const res = await fetch(`${localPort}/chats/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // token: t,
          },
        })
        const data = await res.json()
        setChat({
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
        })
        setResponse(data[0].reply)
      } catch (err) {
        router.push('/')
      }
    }
    getData()
    // }
  }, [router])

  if (chat.chatID === '') {
    return <div></div>
  }

  return (
    <SideBar>
      <Stack
        direction="column"
        spacing={2}
        sx={{ height: '90vh', display: 'flex' }}
      >
        <Typography variant="h3">
          {' '}
          DM Name {router.query.messageCode}{' '}
        </Typography>
        <Stack
          sx={{
            flexGrow: 1,
            overflowY: 'scroll',
          }}
        >
          <MessageBlock message={chat} respond={false} />
          <Divider orientation="horizontal" flexItem />
          <div style={{ paddingLeft: '50px' }}>
            <Stack direction="column" spacing={2}>
              <div>Responses</div>
              {response &&
                response.map((msg: MsgProps) => (
                  <MessageBlock
                    key={msg.chatID}
                    message={msg}
                    respond={false}
                  />
                ))}
            </Stack>
          </div>
        </Stack>
        <InputBox />
      </Stack>
    </SideBar>
  )
}

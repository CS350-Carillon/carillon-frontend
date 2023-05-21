import { useRouter } from 'next/router'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SideBar from '../../../../components/SideBar'
import MessageBlock from '../../../../components/MessageBlock'
import InputBox from '../../../../components/InputBox'

export const dummyData: {
  chatID: string
  chatContent: string
  chatReaction: {
    [index: string]: { userID: number; userName: string }[]
    check: { userID: number; userName: string }[]
    favorite: { userID: number; userName: string }[]
    moodbad: { userID: number; userName: string }[]
    thumbup: { userID: number; userName: string }[]
  }
  chatSender: { name: string }
  reply: {
    chatID: string
    chatContent: string
    chatReaction: {
      check: [
        { userID: 1; userName: 'Sihyun' },
        { userID: 2; userName: 'Jack' },
      ]
      favorite: [{ userID: 3; userName: 'Susan' }]
      moodbad: []
      thumbup: []
    }
    chatSender: { name: string }
  }[]
} = {
  chatID: '1',
  chatContent:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  chatReaction: {
    check: [
      { userID: 1, userName: 'Sihyun' },
      { userID: 2, userName: 'Jack' },
    ],
    favorite: [{ userID: 3, userName: 'Susan' }],
    moodbad: [],
    thumbup: [],
  },
  chatSender: { name: 'Sia' },
  reply: [
    {
      chatID: '2',
      chatContent:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      chatReaction: {
        check: [
          { userID: 1, userName: 'Sihyun' },
          { userID: 2, userName: 'Jack' },
        ],
        favorite: [{ userID: 3, userName: 'Susan' }],
        moodbad: [],
        thumbup: [],
      },
      chatSender: { name: 'Susan' },
    },
    {
      chatID: '3',
      chatContent:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      chatReaction: {
        check: [
          { userID: 1, userName: 'Sihyun' },
          { userID: 2, userName: 'Jack' },
        ],
        favorite: [{ userID: 3, userName: 'Susan' }],
        moodbad: [],
        thumbup: [],
      },
      chatSender: { name: 'Jack' },
    },
  ],
}

export default function ChannelComp() {
  const router = useRouter()

  return (
    <SideBar>
      <Stack spacing={2} sx={{ height: '90vh', display: 'flex' }}>
        <Typography variant="h3">
          {' '}
          Channel Name {router.query.channelCode}{' '}
        </Typography>
        <Stack
          sx={{
            flexGrow: 1,
            overflowY: 'scroll',
          }}
        >
          <MessageBlock message={dummyData} respond />
          <MessageBlock message={dummyData} respond />
        </Stack>
        <InputBox />
      </Stack>
    </SideBar>
  )
}

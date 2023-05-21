import { useRouter } from 'next/router'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SideBar from '../../../../components/SideBar'
import MessageBlock from '../../../../components/MessageBlock'
import InputBox from '../../../../components/InputBox'
import { dummyData } from '../../channel/[channelCode]'

export default function DmComp() {
  const router = useRouter()
  return (
    <SideBar>
      <Stack spacing={2}>
        <Typography variant="h3"> DM Name {router.query.dmCode} </Typography>
        <Stack>
          <MessageBlock message={dummyData} respond />
          <MessageBlock message={dummyData} respond />
        </Stack>
        <InputBox />
      </Stack>
    </SideBar>
  )
}

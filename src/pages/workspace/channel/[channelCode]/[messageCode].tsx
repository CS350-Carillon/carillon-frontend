import { useRouter } from 'next/router'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SideBar from '../../../../components/SideBar'
import MessageBlock from '../../../../components/MessageBlock'
import InputBox from '../../../../components/InputBox'

export default function ChannelRespComp() {
  const router = useRouter()
  return (
    <SideBar>
      <Stack direction="column" spacing={2}>
        <Typography variant="h3"> {router.query.messageCode} </Typography>
        <MessageBlock respond={false} />
        <Divider orientation="horizontal" flexItem />
        <div style={{ paddingLeft: '50px' }}>
          <Stack direction="column" spacing={2}>
            <div>Responses</div>
            <MessageBlock respond={false} />
            <MessageBlock respond={false} />
          </Stack>
        </div>
        <InputBox />
      </Stack>
    </SideBar>
  )
}

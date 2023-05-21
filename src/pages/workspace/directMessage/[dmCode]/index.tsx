import { useRouter } from 'next/router'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SideBar from '../../../../components/SideBar'
import MessageBlock from '../../../../components/MessageBlock'
import InputBox from '../../../../components/InputBox'

export default function DmComp() {
  const router = useRouter()
  return (
    <SideBar>
      <Stack spacing={2} sx={{ height: '90vh', display: 'flex' }}>
        <Typography variant="h3"> {router.query.dmCode} </Typography>
        <Stack
          sx={{
            flexGrow: 1,
            overflowY: 'scroll',
          }}
        >
          <MessageBlock respond />
          <MessageBlock respond />
        </Stack>
        <InputBox />
      </Stack>
    </SideBar>
  )
}

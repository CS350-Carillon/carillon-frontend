import SideBar from '../../components/SideBar'
import '../../app/globals.css'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const StyledButton = styled(Button)({
  textTransform: 'none',
})

function Field({ label, value }: { label: string; value: string }) {
  const styles: { [key: string]: React.CSSProperties } = {
    label: {
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'end',
      height: '100%',
    },
  }

  return (
    <>
      <Grid item xs={3}>
        <div style={styles.label}>
          <Typography style={{ marginBottom: '3px' }}>{label}</Typography>
        </div>
      </Grid>
      <Grid item xs={8}>
        <TextField
          id="standard-basic"
          type={label === 'Password' ? 'password' : ''}
          variant="standard"
          defaultValue={value}
          placeholder={label}
          fullWidth={true}
        />
      </Grid>
    </>
  )
}

function ChannelList({
  channelList,
}: {
  channelList: { workspace: string; channels: string[] }[]
}) {
  return (
    <>
      <Grid item xs={12} marginTop={2}>
        <Typography>My Workspace / Channels</Typography>
      </Grid>
      <Grid container rowSpacing={0}>
        {channelList.map((item) => (
          <>
            <Grid item xs={12}>
              <StyledButton variant="text">{item.workspace}</StyledButton>
            </Grid>
            {item.channels.map((channel) => (
              <Grid item xs={12} paddingLeft={2}>
                <StyledButton variant="text">{channel}</StyledButton>
              </Grid>
            ))}
          </>
        ))}
      </Grid>
    </>
  )
}

export default function Mypage() {
  const channelList: { workspace: string; channels: string[] }[] = [
    {
      workspace: 'CS350',
      channels: ['Channel 1', 'Channel 2'],
    },
    {
      workspace: 'CS420',
      channels: ['Channel A', 'Channel B'],
    },
  ]
  return (
    <SideBar>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Grid container rowSpacing={1} sx={{ width: '50%' }}>
          <Field label="ID" value="Doheydo" />
          <Field label="Password" value="12345678aa" />
          <Field label="Name" value="Dohye Kim" />
          <ChannelList channelList={channelList} />
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              style={{ width: '200px', height: '40px' }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </SideBar>
  )
}

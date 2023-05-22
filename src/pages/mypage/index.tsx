import '../../app/globals.css'
import React from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Accordion, { AccordionProps } from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SideBar from '../../components/SideBar'

const dummyData = {
  id: 'Dohyedo',
  password: '12345678aa',
  name: 'Dohye Kim',
  channelList: [
    {
      workspace: 'CS350',
      channels: ['Channel 1', 'Channel 2'],
    },
    {
      workspace: 'CS420',
      channels: ['Channel A', 'Channel B'],
    },
  ],
}

const StyledButton = styled(Button)({
  textTransform: 'none',
  color: 'black',
  '& .MuiAccordionSummary-root': {
    padding: '40px',
  },
})

const StyledAccordion = styled((props: AccordionProps) => (
  <Accordion elevation={0} {...props} />
))(() => ({
  border: 0,
  padding: 0,
  margin: 0,
  '& > .MuiAccordionSummary-root': {
    minHeight: '0 !important',
  },
  '& > .Mui-expanded': {
    marginBottom: '8px',
  },
  '& > .MuiAccordionSummary-root > .MuiAccordionSummary-content': {
    margin: 0,
  },
}))

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
      <Grid item xs={4}>
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
          fullWidth
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
    <Grid item xs={12} paddingBottom={1}>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ padding: 0, margin: 0 }}
        >
          <Typography>My Workspaces / Channels</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container rowSpacing={0.4}>
            {channelList.map((item) => (
              <React.Fragment key={item.workspace}>
                <Grid item xs={12}>
                  <StyledButton variant="text">
                    <Typography>{item.workspace}</Typography>
                  </StyledButton>
                </Grid>
                {item.channels.map((channel) => (
                  <Grid item xs={12} paddingLeft={2} key={channel}>
                    <StyledButton variant="text">
                      <Typography>{channel}</Typography>
                    </StyledButton>
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </AccordionDetails>
      </StyledAccordion>
    </Grid>
  )
}

export default function Mypage() {
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
        <Grid container rowSpacing={3} sx={{ width: '65%' }}>
          <Field label="ID" value={dummyData.id} />
          <Field label="Password" value={dummyData.password} />
          <Field label="Name" value={dummyData.name} />
          <ChannelList channelList={dummyData.channelList} />
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

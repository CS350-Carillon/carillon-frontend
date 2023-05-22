import '../../app/globals.css'
import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import Accordion, { AccordionProps } from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LabeledInputBox from '@/components/LabeledInputBox'
import LinkButton from '@/components/LinkButton'
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
  '&::before': {
    backgroundColor: 'transparent',
  },
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

function ChannelList({
  channelList,
}: {
  channelList: { workspace: string; channels: string[] }[]
}) {
  return (
    <StyledAccordion sx={{ width: '100%' }}>
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
  )
}

export default function Mypage() {
  return (
    <SideBar>
      <Stack
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          paddingX: '160px',
        }}
      >
        <LabeledInputBox label="ID" value={dummyData.id} />
        <LabeledInputBox label="Password" value={dummyData.password} />
        <LabeledInputBox label="Name" value={dummyData.name} />
        <ChannelList channelList={dummyData.channelList} />
        <LinkButton
          onClick={() => {
            // TODO: API
          }}
        >
          Save
        </LinkButton>
      </Stack>
    </SideBar>
  )
}

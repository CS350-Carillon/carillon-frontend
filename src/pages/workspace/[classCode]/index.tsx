import { useRouter } from 'next/router'
import '../../../app/globals.css'
import React from 'react'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import SearchBar from '@/components/SearchBar'
import SideBar from '../../../components/SideBar'

const dummyData = {
  workspaceDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras
            blandit orci id finibus tristique.Donec ac feugiat neque.Proin
            nulla ipsum, egestas nec finibus quis, tincidunt sed massa.Nulla
            vestibulum felis magna, sit amet sagittis arcu condimentum non.
            Donec accumsan ipsum nec leo maximus, at blandit turpis mollis.
            Mauris ultrices ex nisi, vitae vehicula lorem laoreet quis.
            Suspendisse in leo at ante ornare pulvinar.Phasellus aliquam
            rhoncus augue dictum tincidunt.Sed rhoncus purus eget congue
            accumsan.In non dolor purus.Donec facilisis hendrerit finibus.`,
  channels: [1, 2, 3],
}

export default function ClassMainPage() {
  const router = useRouter()

  return (
    <SideBar>
      <Stack sx={{ paddingTop: 4 }} spacing={2}>
        <SearchBar />
        <Typography
          variant="h3"
          component="h3"
          sx={{
            display: 'flex',
            paddingBottom: 2,
            borderBottom: 1,
            borderColor: 'lightgray',
          }}
        >
          <CloudQueueIcon sx={{ fontSize: 50, mr: 1 }} />
          {String(router.query.classCode).toUpperCase()}
        </Typography>
        <Box
          sx={{
            paddingBottom: 2,
            borderBottom: 1,
            borderColor: 'lightgray',
          }}
        >
          <Typography sx={{ paddingBottom: 2 }} variant="h5">
            Description
          </Typography>
          <Typography variant="body1">
            {dummyData.workspaceDescription}
          </Typography>
        </Box>
        <Box
          sx={{
            paddingBottom: 2,
            borderBottom: 1,
            borderColor: 'lightgray',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h5">Channels</Typography>
            </Grid>
            <Grid item xs={4}>
              <SearchBar />
            </Grid>
            <List
              dense
              sx={{
                pl: 4,
              }}
            >
              {dummyData.channels.map((value) => {
                const labelId = `channel-${value}`
                return (
                  <ListItem key={value} disablePadding>
                    <ListItemButton>
                      <FolderOpenIcon sx={{ mr: 2 }} />
                      <ListItemText id={labelId} primary={`Channel ${value}`} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
            <Grid item xs={12}>
              <Button sx={{ mt: 12 }} variant="text">
                +New Channel
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            paddingBottom: 2,
            borderBottom: 1,
            borderColor: 'lightgray',
          }}
        >
          <Typography variant="h5">Members</Typography>
          <Button sx={{ mt: 1 }} variant="text">
            +New Member
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box></Box>
          <Button sx={{ marginLeft: 'auto' }} variant="text">
            Delete Workspace
          </Button>
        </Box>
      </Stack>
    </SideBar>
  )
}

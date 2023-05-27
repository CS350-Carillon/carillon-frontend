import { useRouter } from 'next/router'
import '../../../../app/globals.css'
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Checkbox from '@mui/material/Checkbox'
import SearchBar from '@/components/SearchBar'
import SideBar from '../../../../../components/SideBar'

const dummyData = {
  channelDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras
            blandit orci id finibus tristique.Donec ac feugiat neque.Proin
            nulla ipsum, egestas nec finibus quis, tincidunt sed massa.Nulla
            vestibulum felis magna, sit amet sagittis arcu condimentum non.
            Donec accumsan ipsum nec leo maximus, at blandit turpis mollis.
            Mauris ultrices ex nisi, vitae vehicula lorem laoreet quis.
            Suspendisse in leo at ante ornare pulvinar.Phasellus aliquam
            rhoncus augue dictum tincidunt.Sed rhoncus purus eget congue
            accumsan.In non dolor purus.Donec facilisis hendrerit finibus.`,
  members: ['Mina', 'Whyojin', 'Erik', 'Lion', 'Susana', 'Becky', 'Woojin'],
}

export default function ChannelComp() {
  const router = useRouter()
  return (
    <SideBar>
      <Stack sx={{ paddingTop: 4 }} spacing={2}>
        <Typography variant="h3">Channel {router.query.channelCode}</Typography>
        <Grid
          container
          justifyContent="space-between"
          sx={{
            paddingBottom: 2,
            borderBottom: 1,
            borderColor: 'lightgray',
          }}
        >
          <Grid item xs={10}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Checkbox checked />
              <Typography variant="body2">Default Channel</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Button variant="text">Delete Workspace</Button>
          </Grid>
        </Grid>
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
            {dummyData.channelDescription}
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h5">
                Members ({dummyData.members.length})
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <SearchBar />
            </Grid>
          </Grid>
          <List
            dense
            sx={{
              pl: 2,
            }}
          >
            {dummyData.members.map((value) => {
              const labelId = `member-${value}`
              return (
                <ListItem key={value} disablePadding>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar ${value}`}
                        src={`/static/images/avatar/${value}.jpg`}
                      />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={`${value}`} />
                  </ListItem>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Stack>
    </SideBar>
  )
}

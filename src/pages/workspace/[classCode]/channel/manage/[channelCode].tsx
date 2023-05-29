import React, { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import '../../../../../app/globals.css'
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
import { IChannel } from '@/utils/types'
import { localPort } from '@/utils/constants'
import SideBar from '../../../../../components/SideBar'

interface ChannelProps {
  channels: IChannel[]
}

export default function ChannelComp({ channels }: ChannelProps) {
  const router = useRouter()
  const [, setSearchQuery] = useState('')

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
  }

  const handleDeleteChannel = () => {
    // To Do: token 바꾸기
    fetch(`${localPort}/channels/`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzM3MTYwZjJjNzNkMDgzMTgxNGM2ZiIsInR5cGUiOiJTVFVERU5UIiwiaWF0IjoxNjg1MzI2OTk3LCJleHAiOjE2ODU0MTMzOTd9.A9vZOlUogSWpsD139orcTyHNVJCjow5Hg5Pb7xp0sZY',
      },
      body: JSON.stringify(channels[0].name),
    }).then((response) => {
      if (response.ok) {
        console.log('response.ok')
        // router.push('/workspace')
      } else {
        console.log('not response.ok')
      }
    })
  }

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
            <Button variant="text" onClick={handleDeleteChannel}>
              Delete Workspace
            </Button>
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
          <Typography variant="body1">{channels[0].description}</Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h5">Members</Typography>
            </Grid>
            <Grid item xs={2}>
              <SearchBar onChange={handleSearchQueryChange} />
            </Grid>
          </Grid>
          <List
            dense
            sx={{
              pl: 2,
            }}
          >
            {channels[0].members.map((value) => {
              const labelId = `member-${value}`
              return (
                <ListItem key={labelId} disablePadding>
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

export async function getServerSideProps() {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }

  const res = await fetch(`${localPort}/channels/`, options)
  const channels = await res.json()

  return {
    props: { channels },
  }
}

import React, { useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { placeholder, localPort } from '@/utils/constants'
import SearchBar from '@/components/SearchBar'
import { IUser } from '@/utils/types'
import { useRouter } from 'next/router'
import SideBar from '@/components/SideBar'

interface UsersProps {
  users: IUser[]
}

export default function Channel({ users }: UsersProps) {
  const router = useRouter()
  const [channelName, setChannelName] = useState('')
  const [description, setDescription] = useState('')
  const [, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<IUser[]>([])
  const [selectedMembers, setSelectedMembers] = useState<IUser[]>([])

  const handleChannelNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setChannelName(event.target.value)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value)
  }

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)

    const matchedUser = users.find(
      (user) => user.userId.toLowerCase() === query.toLowerCase(),
    )

    const matchedUsers = users.filter((user) =>
      user.userId.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(matchedUsers.slice(0, 5))

    if (matchedUser && !selectedMembers.includes(matchedUser)) {
      setSelectedMembers((prevMembers) => [...prevMembers, matchedUser])
    }
  }

  const handleCreateChannel = () => {
    const channelData = {
      name: channelName,
      description,
      members: selectedMembers.map((member) => member.userId),
      workspace: router.query.classCode,
    }

    // To Do: token 가져오는 방식
    fetch(`${localPort}/channels/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzM3MTYwZjJjNzNkMDgzMTgxNGM2ZiIsInR5cGUiOiJTVFVERU5UIiwiaWF0IjoxNjg1MzIzMTkyLCJleHAiOjE2ODU0MDk1OTJ9.2bSfViIASj6K-9DGppFiZBlo0s3PSK70kdPxDibYb6g',
      },
      body: JSON.stringify(channelData),
    }).then((response) => {
      if (response.ok) {
        console.log('response.ok')
        router.push(`/channel/${channelData.name}`)
      } else {
        console.log('not response.ok')
      }
    })
  }

  return (
    <SideBar>
      <Stack sx={{ paddingTop: 4 }} spacing={2}>
        <Box>
          <Typography sx={{ paddingBottom: 2 }} variant="h5">
            Channel name
          </Typography>
          <TextField
            fullWidth
            placeholder={placeholder.channelName}
            variant="standard"
            value={channelName}
            onChange={handleChannelNameChange}
          />
        </Box>
        <Box>
          <Typography sx={{ paddingBottom: 2 }} variant="h5">
            Description
          </Typography>
          <TextField
            fullWidth
            placeholder={placeholder.description}
            variant="standard"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h5">
                Members ({selectedMembers.length})
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <SearchBar onChange={handleSearchQueryChange} />
            </Grid>
          </Grid>
          <List dense sx={{ pl: 2 }}>
            {selectedMembers.map((value) => {
              const labelId = `member-${value.userId}`
              return (
                <ListItem key={value.userId} disablePadding>
                  <ListItem>
                    <ListItemText id={labelId} primary={`${value.userId}`} />
                  </ListItem>
                </ListItem>
              )
            })}
          </List>
          {searchResults.length > 0 && (
            <Box mt={4}>
              <Typography variant="h6">Search Results</Typography>
              <List dense sx={{ pl: 2 }}>
                {searchResults.map((value) => {
                  const labelId = `member-${value.userId}`
                  return (
                    <ListItem key={value.userId} disablePadding>
                      <ListItem>
                        <ListItemText
                          id={labelId}
                          primary={`${value.userId}`}
                        />
                      </ListItem>
                    </ListItem>
                  )
                })}
              </List>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: 300,
              height: 50,
            }}
            onClick={handleCreateChannel}
          >
            Create
          </Button>
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

  const res = await fetch(`${localPort}/users/`, options)
  const users = await res.json()

  return {
    props: { users },
  }
}

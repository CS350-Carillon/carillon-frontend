import React, { useState, ChangeEvent } from 'react'
import '../../../app/globals.css'
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
import { IWorkspace } from '@/utils/types'
import { placeholder, localPort } from '@/utils/constants'
import { useRouter } from 'next/router'
import SideBar from '../../../components/SideBar'

interface WorkspacesProps {
  workspaces: IWorkspace[]
}

export default function ClassMainPage({ workspaces }: WorkspacesProps) {
  const router = useRouter()
  const [, setSearchQuery] = useState('')
  const [, setSearchResults] = useState<IWorkspace[]>([])
  const [selectedWorkspaces, setSelectedWorkspaces] = useState<IWorkspace[]>([])

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)

    const matchedWorkspace = workspaces.find(
      (workspace) => workspace.name.toLowerCase() === query.toLowerCase(),
    )

    const matchedWorkspaces = workspaces.filter((workspace) =>
      workspace.name.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(matchedWorkspaces.slice(0, 5))

    if (matchedWorkspace && !selectedWorkspaces.includes(matchedWorkspace)) {
      setSelectedWorkspaces((prevMembers) => [...prevMembers, matchedWorkspace])
    }
  }

  const handleDeleteWorkspace = () => {
    // To Do: token 바꾸기
    fetch(`${localPort}/workspaces/`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzM3MTYwZjJjNzNkMDgzMTgxNGM2ZiIsInR5cGUiOiJTVFVERU5UIiwiaWF0IjoxNjg1MzI2OTk3LCJleHAiOjE2ODU0MTMzOTd9.A9vZOlUogSWpsD139orcTyHNVJCjow5Hg5Pb7xp0sZY',
      },
      body: JSON.stringify(selectedWorkspaces[0].name),
    }).then((response) => {
      if (response.ok) {
        router.push('/workspace')
      } else {
        console.log('not response.ok')
      }
    })
  }

  return (
    <SideBar>
      <Stack sx={{ paddingTop: 4 }} spacing={2}>
        <SearchBar onChange={handleSearchQueryChange} />
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
          {selectedWorkspaces.length > 0
            ? selectedWorkspaces[0].name.toUpperCase()
            : null}
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
          {/* To Do: workspace에 description 추가 필요 */}
          <Typography variant="body1">{placeholder.description}</Typography>
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
              {/* To Do: Channel Search 추가 */}
              <SearchBar onChange={handleSearchQueryChange} />
            </Grid>
            <List
              dense
              sx={{
                pl: 4,
              }}
            >
              {selectedWorkspaces.length > 0 &&
                selectedWorkspaces[0].channels.map((value) => {
                  const labelId = `channel-${value}`
                  return (
                    <ListItem key={labelId} disablePadding>
                      <ListItemButton>
                        <FolderOpenIcon sx={{ mr: 2 }} />
                        <ListItemText
                          id={labelId}
                          primary={`Channel ${value}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
            </List>
            <Grid item xs={12}>
              {/* To Do: New Channel 추가 */}
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
          {/* To Do: New Member 추가 */}
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
          <Button
            sx={{ marginLeft: 'auto' }}
            variant="text"
            onClick={handleDeleteWorkspace}
          >
            Delete Workspace
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

  const res = await fetch(`${localPort}/workspaces/`, options)
  const workspaces = await res.json()

  return {
    props: { workspaces },
  }
}

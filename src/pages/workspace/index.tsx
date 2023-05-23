import '../../app/globals.css'
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import SearchBar from '@/components/SearchBar'
import { placeholder, localPort } from '@/utils/constants'
import { IWorkspace, IUser } from '@/utils/types'
import SideBar from '../../components/SideBar'

interface WorkspaceProps {
  workspace: IWorkspace
}

export default function Workspace({ workspace }: WorkspaceProps) {
  return (
    <SideBar>
      <Stack sx={{ paddingTop: 4 }} spacing={2}>
        <Box>
          <Typography sx={{ paddingBottom: 2 }} variant="h5">
            Workspace Name
          </Typography>
          <TextField
            fullWidth
            placeholder={placeholder.workspaceName}
            variant="standard"
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
          />
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h5">
                Members ({workspace.members.length})
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
            {workspace.members.map((value: IUser) => {
              const labelId = `member-${value}`
              return (
                <ListItem key={String(value)} disablePadding>
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
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmM4NmMzMGM1ZWZmZjMwNGYxZTlkMSIsInR5cGUiOiJTVFVERU5UIiwiaWF0IjoxNjg0ODMzOTk3LCJleHAiOjE2ODQ5MjAzOTd9.8q0edHfeXUNh72XRseM-ur3vkOZnoGHvaDfv84VkNq0',
    },
    body: JSON.stringify({
      name: 'CS350',
    }),
  }

  const res = await fetch(`${localPort}/workspaces/`, options)
  const workspace = await res.json()

  return {
    props: { workspace },
  }
}

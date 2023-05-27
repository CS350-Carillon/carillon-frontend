import '../../../../app/globals.css'
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
import SideBar from '../../../../components/SideBar'

const dummyData = {
  workspaceNamePlaceholder: 'Enter Channel Name',
  descriptionPlaceholder: 'Enter Channel Description',
  members: ['Mina', 'Whyojin', 'Erik'],
}

export default function Channel() {
  return (
    <SideBar>
      <Stack sx={{ paddingTop: 4 }} spacing={2}>
        <Box>
          <Typography sx={{ paddingBottom: 2 }} variant="h5">
            Channel name
          </Typography>
          <TextField
            fullWidth
            placeholder={dummyData.workspaceNamePlaceholder}
            variant="standard"
          />
        </Box>
        <Box>
          <Typography sx={{ paddingBottom: 2 }} variant="h5">
            Description
          </Typography>
          <TextField
            fullWidth
            placeholder={dummyData.descriptionPlaceholder}
            variant="standard"
          />
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

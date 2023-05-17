import AddIcon from '@mui/icons-material/Add'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import styles from './MessageBlock.module.css'

function Profile() {
  return (
    <div style={{ padding: '5px 5px' }}>
      <AccountCircleOutlinedIcon fontSize="large" />
    </div>
  )
}

function Content() {
  return (
    <Stack direction="column" spacing={1}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        paddingBottom={0.5}
      >
        <div> UserName </div>
        <IconButton aria-label="check" size="small">
          <DeleteIcon />
        </IconButton>
      </Stack>
      <div id="content">
        {' '}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum{' '}
      </div>
    </Stack>
  )
}

function Reaction() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="check" size="small" sx={{ color: 'blue' }}>
          <CheckCircleIcon />
        </IconButton>
        <IconButton aria-label="heart" size="small" sx={{ color: 'red' }}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="mood-bad" size="small" sx={{ color: 'orange' }}>
          <MoodBadIcon />
        </IconButton>
        <IconButton aria-label="thumb-up" size="small" sx={{ color: 'purple' }}>
          <ThumbUpAltIcon />
        </IconButton>
      </Stack>
    </div>
  )
}

function RespondButton() {
  return (
    <Button>
      <AddIcon fontSize="small" />N responses
    </Button>
  )
}

export default function MessageBlock({ respond }: { respond: boolean }) {
  return (
    <div className={styles.format}>
      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Profile />
        <div className={styles.text}>
          <Content />
          <Stack direction="row" justifyContent="space-between">
            {respond ? <RespondButton /> : <div />}
            <Reaction />
          </Stack>
        </div>
      </Stack>
    </div>
  )
}

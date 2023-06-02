import AddIcon from '@mui/icons-material/Add'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { localPort } from '@/utils/constants'
import styles from './MessageBlock.module.css'

export interface MsgProps {
  id: string
  content: string
  responses?: MsgProps[]
  reactions: {
    [index: string]: { userID: string; userName: string }[]
    Check: { userID: string; userName: string }[]
    Favorite: { userID: string; userName: string }[]
    Moodbad: { userID: string; userName: string }[]
    Thumbup: { userID: string; userName: string }[]
  }
  sender: { id: string; name: string }
}

function Profile() {
  return (
    <div style={{ padding: '5px 5px' }}>
      <AccountCircleOutlinedIcon fontSize="large" />
    </div>
  )
}

function Content({
  content,
  userName,
  myMsg,
  onDelete,
  onEdit,
}: {
  content: string
  userName: string
  myMsg: boolean
  onDelete: () => void
  onEdit: () => void
}) {
  return (
    <Stack direction="column" spacing={1}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        paddingBottom={0.5}
      >
        <div> {userName} </div>
        {myMsg ? (
          <Stack direction="row">
            <IconButton
              aria-label="check"
              size="small"
              sx={{ paddingRight: 2 }}
              onClick={onEdit}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="check"
              size="small"
              sx={{ paddingRight: 2 }}
              onClick={onDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        ) : (
          <div />
        )}
      </Stack>
      <div id="content">{content}</div>
    </Stack>
  )
}

function Reaction({
  reactions,
  onClick,
  user,
}: {
  reactions: {
    Check: { userID: string; userName: string }[]
    Favorite: { userID: string; userName: string }[]
    Moodbad: { userID: string; userName: string }[]
    Thumbup: { userID: string; userName: string }[]
  }
  onClick: (reactionType: string, reactionExist: boolean) => void
  user: { userID: string; userName: string }
}) {
  const checkExist: boolean =
    reactions.Check.filter(
      (e: { userID: string; userName: string }) => e.userID === user.userID,
    ).length > 0
  const favoriteExist: boolean =
    reactions.Favorite.filter(
      (e: { userID: string; userName: string }) => e.userID === user.userID,
    ).length > 0
  const moodbadExist: boolean =
    reactions.Moodbad.filter(
      (e: { userID: string; userName: string }) => e.userID === user.userID,
    ).length > 0
  const thumbupExist: boolean =
    reactions.Thumbup.filter(
      (e: { userID: string; userName: string }) => e.userID === user.userID,
    ).length > 0

  const checkList = reactions.Check.map((e) => (
    <div key={e.userID}>{e.userName}</div>
  ))
  const favoriteList = reactions.Favorite.map((e) => (
    <div key={e.userID}>{e.userName}</div>
  ))
  const moodbadList = reactions.Moodbad.map((e) => (
    <div key={e.userID}>{e.userName}</div>
  ))
  const thumbupList = reactions.Thumbup.map((e) => (
    <div key={e.userID}>{e.userName}</div>
  ))

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 20,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ borderRadius: 4, boxShadow: 2 }}>
        <Tooltip
          title={checkList.length > 0 ? checkList : ''}
          disableFocusListener={checkList.length === 0}
          disableHoverListener={checkList.length === 0}
        >
          <IconButton
            aria-label="check"
            size="small"
            onClick={() => onClick('Check', checkExist)}
            sx={{ color: checkExist ? 'blue' : 'gray' }}
          >
            <CheckCircleIcon />
            <Typography variant="caption">
              {reactions.Check.length !== 0 && reactions.Check.length}
            </Typography>
          </IconButton>
        </Tooltip>
        <Tooltip
          title={favoriteList.length > 0 ? favoriteList : ''}
          disableFocusListener={favoriteList.length === 0}
          disableHoverListener={favoriteList.length === 0}
        >
          <IconButton
            aria-label="heart"
            size="small"
            onClick={() => onClick('Favorite', favoriteExist)}
            sx={{ color: favoriteExist ? 'red' : 'gray' }}
          >
            <FavoriteIcon />
            <Typography variant="caption">
              {' '}
              {reactions.Favorite.length !== 0 && reactions.Favorite.length}
            </Typography>
          </IconButton>
        </Tooltip>
        <Tooltip
          title={moodbadList.length > 0 ? moodbadList : ''}
          disableFocusListener={moodbadList.length === 0}
          disableHoverListener={moodbadList.length === 0}
        >
          <IconButton
            aria-label="mood-bad"
            size="small"
            onClick={() => onClick('Moodbad', moodbadExist)}
            sx={{ color: moodbadExist ? 'orange' : 'gray' }}
          >
            <MoodBadIcon />
            <Typography variant="caption">
              {' '}
              {reactions.Moodbad.length !== 0 && reactions.Moodbad.length}
            </Typography>
          </IconButton>
        </Tooltip>
        <Tooltip
          title={thumbupList.length > 0 ? thumbupList : ''}
          disableFocusListener={thumbupList.length === 0}
          disableHoverListener={thumbupList.length === 0}
        >
          <IconButton
            aria-label="thumb-up"
            size="small"
            onClick={() => onClick('Thumbup', thumbupExist)}
            sx={{ color: thumbupExist ? 'purple' : 'gray' }}
          >
            <ThumbUpAltIcon />
            <Typography variant="caption">
              {' '}
              {reactions.Thumbup.length !== 0 && reactions.Thumbup.length}
            </Typography>
          </IconButton>
        </Tooltip>
      </Stack>
    </div>
  )
}

function RespondButton({
  RespondOnClick,
  respondLength,
}: {
  RespondOnClick: React.MouseEventHandler<HTMLButtonElement>
  respondLength: number
}) {
  return (
    <Button onClick={RespondOnClick}>
      <AddIcon fontSize="small" />
      {respondLength} responses
    </Button>
  )
}

export default function MessageBlock({
  message,
  respond,
  socket,
}: {
  message: MsgProps
  respond: boolean
  socket: Socket
}) {
  const router = useRouter()
  const [msgState, setMsgState] = useState<MsgProps>(message)
  const [user, setUser] = useState({ userID: '', userName: '' })
  useEffect(() => {
    const i = localStorage.getItem('_id') || ''
    const t = localStorage.getItem('token') || ''
    const getData = async () => {
      try {
        const res = await fetch(`${localPort}/users/${i}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: t,
          },
        })
        const data = await res.json()
        setUser({ userID: i, userName: data.userName })
      } catch (err) {
        router.push('/')
      }
    }
    getData()
  }, [router])

  const onClick = (reactionType: string, reactionExist: boolean) => {
    if (reactionExist) {
      setMsgState((prevMsg: MsgProps) => {
        return {
          ...prevMsg,
          reactions: {
            ...prevMsg.reactions,
            [reactionType]: prevMsg.reactions[reactionType].filter(
              (e) => e.userID !== user.userID,
            ),
          },
        }
      })
    } else {
      socket.emit('addReaction', {
        reactionType,
        reactor: user.userID,
      })
      setMsgState((prevMsg: MsgProps) => {
        return {
          ...prevMsg,
          reactions: {
            ...prevMsg.reactions,
            [reactionType]: [...prevMsg.reactions[reactionType], user],
          },
        }
      })
    }
  }

  const onDelete = () => {
    socket.emit('deleteMessge', { id: msgState.id, content: '' })
  }

  const onEdit = () => {
    socket.emit('editMessge', msgState.id)
  }

  return (
    <div className={styles.format} tabIndex={0}>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={2}
        sx={{ width: '100%' }}
      >
        <Profile />
        <div className={styles.text}>
          <Stack direction="column" spacing={2}>
            <Content
              content={msgState.content}
              userName={msgState.sender.name}
              myMsg={msgState.sender.id === user.userID}
              onDelete={onDelete}
              onEdit={onEdit}
            />
            <Stack direction="row" justifyContent="space-between">
              {respond ? (
                <RespondButton
                  RespondOnClick={() => {
                    router.push({
                      pathname: `${router.asPath}/[messageId]`,
                      query: { messageId: msgState.id },
                    })
                  }}
                  respondLength={
                    msgState.responses ? msgState.responses.length : 0
                  }
                />
              ) : (
                <div />
              )}
              <div id={styles.reaction}>
                <Reaction
                  reactions={msgState.reactions}
                  onClick={onClick}
                  user={user}
                />
              </div>
            </Stack>
          </Stack>
        </div>
      </Stack>
    </div>
  )
}

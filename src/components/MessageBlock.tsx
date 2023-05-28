import AddIcon from '@mui/icons-material/Add'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from './MessageBlock.module.css'

const dummyUser = { userName: 'Sihyun', userID: 1 }

interface MsgProps {
  chatID: string
  chatContent: string
  chatReaction: {
    [index: string]: { userID: number; userName: string }[]
    check: { userID: number; userName: string }[]
    favorite: { userID: number; userName: string }[]
    moodbad: { userID: number; userName: string }[]
    thumbup: { userID: number; userName: string }[]
  }
  chatSender: { name: string }
  reply: {
    chatID: string
    chatContent: string
    chatReaction: {
      check: [
        { userID: 1; userName: 'Sihyun' },
        { userID: 2; userName: 'Jack' },
      ]
      favorite: [{ userID: 3; userName: 'Susan' }]
      moodbad: []
      thumbup: []
    }
    chatSender: { name: string }
  }[]
}

function Profile() {
  return (
    <div style={{ padding: '5px 5px' }}>
      <AccountCircleOutlinedIcon fontSize="large" />
    </div>
  )
}

function Content({ content, userName }: { content: string; userName: string }) {
  return (
    <Stack direction="column" spacing={1}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        paddingBottom={0.5}
      >
        <div> {userName} </div>
        <IconButton aria-label="check" size="small" sx={{ paddingRight: 2 }}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <div id="content">{content}</div>
    </Stack>
  )
}

function Reaction({
  reactions,
  onClick,
}: {
  reactions: {
    check: { userID: number; userName: string }[]
    favorite: { userID: number; userName: string }[]
    moodbad: { userID: number; userName: string }[]
    thumbup: { userID: number; userName: string }[]
  }
  onClick: (
    targetUser: {
      userID: number
      userName: string
    },
    reactionType: string,
    reactionExist: boolean,
  ) => void
}) {
  const checkExist: boolean =
    reactions.check.filter(
      (e: { userID: number; userName: string }) =>
        e.userID === dummyUser.userID,
    ).length > 0
  const favoriteExist: boolean =
    reactions.favorite.filter(
      (e: { userID: number; userName: string }) =>
        e.userID === dummyUser.userID,
    ).length > 0
  const moodbadExist: boolean =
    reactions.moodbad.filter(
      (e: { userID: number; userName: string }) =>
        e.userID === dummyUser.userID,
    ).length > 0
  const thumbupExist: boolean =
    reactions.thumbup.filter(
      (e: { userID: number; userName: string }) =>
        e.userID === dummyUser.userID,
    ).length > 0

  const checkList = reactions.check.map((e) => (
    <div key={e.userID}>{e.userName}</div>
  ))
  const favoriteList = reactions.favorite.map((e) => (
    <div key={e.userID}>{e.userName}</div>
  ))
  const moodbadList = reactions.moodbad.map((e) => (
    <div key={e.userID}>{e.userName}</div>
  ))
  const thumbupList = reactions.thumbup.map((e) => (
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
            onClick={() => onClick(dummyUser, 'check', checkExist)}
            sx={{ color: checkExist ? 'blue' : 'gray' }}
          >
            <CheckCircleIcon />
            <Typography variant="caption">
              {reactions.check.length !== 0 && reactions.check.length}
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
            onClick={() => onClick(dummyUser, 'favorite', favoriteExist)}
            sx={{ color: favoriteExist ? 'red' : 'gray' }}
          >
            <FavoriteIcon />
            <Typography variant="caption">
              {' '}
              {reactions.favorite.length !== 0 && reactions.favorite.length}
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
            onClick={() => onClick(dummyUser, 'moodbad', moodbadExist)}
            sx={{ color: moodbadExist ? 'orange' : 'gray' }}
          >
            <MoodBadIcon />
            <Typography variant="caption">
              {' '}
              {reactions.moodbad.length !== 0 && reactions.moodbad.length}
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
            onClick={() => onClick(dummyUser, 'thumbup', thumbupExist)}
            sx={{ color: thumbupExist ? 'purple' : 'gray' }}
          >
            <ThumbUpAltIcon />
            <Typography variant="caption">
              {' '}
              {reactions.thumbup.length !== 0 && reactions.thumbup.length}
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
}: {
  message: MsgProps
  respond: boolean
}) {
  const router = useRouter()
  const [msgState, setMsgState] = useState(message)

  const onClick = (
    targetUser: { userID: number; userName: string },
    reactionType: string,
    reactionExist: boolean,
  ) => {
    if (reactionExist) {
      setMsgState((prevMsg) => {
        return {
          ...prevMsg,
          chatReaction: {
            ...prevMsg.chatReaction,
            [reactionType]: prevMsg.chatReaction[reactionType].filter(
              (e) => e.userID !== targetUser.userID,
            ),
          },
        }
      })
    } else {
      setMsgState((prevMsg) => {
        return {
          ...prevMsg,
          chatReaction: {
            ...prevMsg.chatReaction,
            [reactionType]: [...prevMsg.chatReaction[reactionType], targetUser],
          },
        }
      })
    }
  }

  return (
    <div className={styles.format} tabIndex={0}>
      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Profile />
        <div className={styles.text}>
          <Stack direction="column" spacing={2}>
            <Content
              content={msgState.chatContent}
              userName={msgState.chatSender.name}
            />
            <Stack direction="row" justifyContent="space-between">
              {respond ? (
                <RespondButton
                  RespondOnClick={() => {
                    router.push({
                      pathname: `${router.asPath}/[messageId]`,
                      query: { messageId: msgState.chatID },
                    })
                  }}
                  respondLength={msgState.reply.length}
                />
              ) : (
                <div />
              )}
              <div id={styles.reaction}>
                <Reaction reactions={msgState.chatReaction} onClick={onClick} />
              </div>
            </Stack>
          </Stack>
        </div>
      </Stack>
    </div>
  )
}

import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import SendIcon from '@mui/icons-material/Send'
import { useRef } from 'react'

export default function InputBox() {
  const selectFile = useRef<HTMLInputElement>(null)
  return (
    <Stack
      direction="column"
      spacing={1}
      alignItems="flex-start"
      sx={{ border: 1, borderRadius: 2, borderColor: 'gray' }}
    >
      <TextField
        id="outlined-multiline-static"
        multiline
        fullWidth
        rows={4}
        placeholder="Type a message"
        sx={{ '& fieldset': { border: 'none' } }}
      />
      <div style={{ width: '100%' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingX={1}
          paddingBottom={0.5}
        >
          <input type="file" style={{ display: 'none' }} ref={selectFile} />
          <IconButton
            aria-label="file"
            size="small"
            color="default"
            onClick={() => {
              selectFile?.current.click()
            }}
          >
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton aria-label="file" size="small" color="default">
            <SendIcon />
          </IconButton>
        </Stack>
      </div>
    </Stack>
  )
}

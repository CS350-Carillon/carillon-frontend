import { Typography, Stack } from '@mui/material'
import LabeledInputBox from '@/components/LabeledInputBox'
import LinkButton from '@/components/LinkButton'
import { useState } from 'react'

export default function SignUp() {
  const [valid, setValid] = useState(true)

  function validate(password: string) {
    // Minimum ten characters, at least one letter, one number and one special character:
    // ref : https://stackoverflow.com/a/21456918
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/
    setValid(regex.test(password))
  }

  return (
    <div style={{ height: '100vh' }}>
      <Stack
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingX: '400px',
          height: '100%',
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: '900', color: '#2f6eba', marginBottom: '60px' }}
        >
          Sign Up
        </Typography>
        <LabeledInputBox label="ID" value="" />
        <Stack style={{ width: '100%' }}>
          <LabeledInputBox
            label="Password"
            value=""
            onChange={(e) => validate(e.target.value)}
          />
          <Typography
            variant="caption"
            color="#CE0101"
            display={valid ? 'none' : ''}
          >
            Minimum 10 characters, at least one letter, one number and one
            special character.
          </Typography>
        </Stack>
        <LabeledInputBox
          label="Name"
          value=""
          style={{ marginBottom: '60px' }}
        />
        <LinkButton
          onClick={() => {
            // TODO: API
          }}
        >
          Sign up
        </LinkButton>
      </Stack>
    </div>
  )
}

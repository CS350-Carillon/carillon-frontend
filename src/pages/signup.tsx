import { Typography, Stack } from '@mui/material'
import LabeledInputBox from '@/components/LabeledInputBox'
import LinkButton from '@/components/LinkButton'
import { useState } from 'react'
import { localPort } from '@/utils/constants'

export default function SignUp() {
  const [form, setForm] = useState({
    userId: '',
    password: '',
    userName: '',
  })

  const [valid, setValid] = useState(false)

  function validate(password: string) {
    // Minimum ten characters, at least one letter, one number and one special character:
    // ref : https://stackoverflow.com/a/21456918
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/
    setValid(regex.test(password))
  }

  const handleOnClick = async () => {
    try {
      const res = await fetch(`${localPort}/users/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      const data = await res.json() // eslint-disable-line no-unused-vars
    } catch (err) {
      // eslint-disable-line no-empty
    }
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
        <LabeledInputBox
          label="ID"
          value=""
          onChange={(e) => {
            setForm((prev) => ({ ...prev, userId: e.target.value }))
          }}
        />
        <Stack style={{ width: '100%' }}>
          <LabeledInputBox
            label="Password"
            value=""
            onChange={(e) => {
              setForm((prev) => ({ ...prev, password: e.target.value }))
              validate(e.target.value)
            }}
          />
          <Typography
            variant="caption"
            color="#CE0101"
            display={valid || form.password === '' ? 'none' : ''}
          >
            Minimum 10 characters, at least one letter, one number and one
            special character.
          </Typography>
        </Stack>
        <LabeledInputBox
          label="Name"
          value=""
          style={{ marginBottom: '60px' }}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, userName: e.target.value }))
          }}
        />
        <LinkButton onClick={handleOnClick} disabled={!valid}>
          Sign up
        </LinkButton>
      </Stack>
    </div>
  )
}

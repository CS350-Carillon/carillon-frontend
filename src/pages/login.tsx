import { Typography, Stack } from '@mui/material'
import LabeledInputBox from '@/components/LabeledInputBox'
import LinkButton from '@/components/LinkButton'
import { useState } from 'react'
import { localPort } from '@/utils/constants'

export default function Login() {
  const [form, setForm] = useState({
    userId: '',
    password: '',
  })

  const handleOnClick = async () => {
    try {
      const res = await fetch(`${localPort}/users/login`, {
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
          Log In
        </Typography>
        <LabeledInputBox
          label="ID"
          value=""
          onChange={(e) =>
            setForm((prev) => ({ ...prev, userId: e.target.value }))
          }
        />
        <LabeledInputBox
          label="Password"
          value=""
          style={{ marginBottom: '60px' }}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <LinkButton
          onClick={handleOnClick}
          disabled={form.userId === '' || form.password === ''}
        >
          Log in
        </LinkButton>
        <LinkButton href="/signup" style={{ background: 'gray' }}>
          Sign up
        </LinkButton>
      </Stack>
    </div>
  )
}

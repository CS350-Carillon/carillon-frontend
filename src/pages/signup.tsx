import { Typography, Stack } from '@mui/material'
import LabeledInputBox from '@/components/LabeledInputBox'
import LinkButton from '@/components/LinkButton'
import { useState, useEffect } from 'react'
import { localPort } from '@/utils/constants'
import { useRouter } from 'next/router'

export default function SignUp() {
  const router = useRouter()

  const [failed, setFailed] = useState(false)

  const [form, setForm] = useState({
    userId: '',
    password: '',
    userName: '',
  })

  const [valid, setValid] = useState(true)
  function validate(password: string) {
    // Minimum ten characters, at least one letter, one number and one special character:
    // ref : https://stackoverflow.com/a/21456918
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/
    setValid(regex.test(password))
  }

  const [ready, setReady] = useState(false)
  useEffect(() => {
    setFailed(false)
    validate(form.password)
    if (form.userId !== '' && form.password !== '' && form.userName !== '') {
      setReady(true)
    } else {
      setReady(false)
    }
  }, [form])

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
      await res.json()
      router.push(
        {
          pathname: '/login',
          query: { afterSignUp: true },
        },
        '/login',
      )
    } catch (err) {
      setFailed(true)
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
        <Stack justifyContent="center" alignItems="center" spacing={1}>
          <LinkButton onClick={handleOnClick} disabled={!ready || !valid}>
            Sign up
          </LinkButton>
          <Typography
            variant="caption"
            color="#CE0101"
            style={{ visibility: failed ? 'visible' : 'hidden' }}
          >
            Failed to sign up. Please try again.
          </Typography>
        </Stack>
      </Stack>
    </div>
  )
}

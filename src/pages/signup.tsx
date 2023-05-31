import { Typography, Stack } from '@mui/material'
import LabeledInputBox from '@/components/LabeledInputBox'
import LinkButton from '@/components/LinkButton'
import { useState, useEffect } from 'react'
import { localPort } from '@/utils/constants'
import { useRouter } from 'next/router'
import validatePassword from '@/utils/validatePassword'

export default function SignUp() {
  const router = useRouter()

  const [isLogged, setIsLogged] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/workspace') // TODO: change routing page
    } else {
      setIsLogged(false)
    }
  }, [router])

  const [failed, setFailed] = useState(false)

  const [form, setForm] = useState({
    userId: '',
    password: '',
    userName: '',
  })

  const [valid, setValid] = useState(true)

  const [ready, setReady] = useState(false)
  useEffect(() => {
    setFailed(false)
    setValid(validatePassword(form.password))
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
    !isLogged && (
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
              type="password"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }}
            />
            <Typography
              variant="caption"
              color="#CE0101"
              display={valid || form.password === '' ? 'none' : ''}
            >
              At least 10 characters including English letters and numbers or
              special characters. At least 8 characters including all three.
              Only !, @, #, $, %, ^, &, and * are allowed for the special
              characters.
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
  )
}

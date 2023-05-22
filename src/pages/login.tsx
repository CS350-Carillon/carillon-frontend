import { Typography, Stack } from '@mui/material'
import LabeledInputBox from '@/components/LabeledInputBox'
import LinkButton from '@/components/LinkButton'

export default function Login() {
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
        <LabeledInputBox label="ID" value="" />
        <LabeledInputBox
          label="Password"
          value=""
          style={{ marginBottom: '60px' }}
        />
        <LinkButton
          onClick={() => {
            // TODO: API
          }}
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

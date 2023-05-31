import { Grid, Typography, TextField } from '@mui/material'

export default function LabeledInputBox({
  label,
  value,
  style,
  type,
  onChange,
}: {
  label: string
  value: string
  type?: string
  style?: React.CSSProperties
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}) {
  const styles: { [key: string]: React.CSSProperties } = {
    label: {
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'end',
      height: '100%',
    },
  }

  return (
    <Grid container style={style}>
      <Grid item xs={4}>
        <div style={styles.label}>
          <Typography style={{ marginBottom: '3px' }}>{label}</Typography>
        </div>
      </Grid>
      <Grid item xs={8}>
        <TextField
          id="standard-basic"
          type={type || ''}
          variant="standard"
          defaultValue={value}
          placeholder={label}
          fullWidth
          onChange={onChange}
        />
      </Grid>
    </Grid>
  )
}

LabeledInputBox.defaultProps = {
  style: undefined,
  onChange: undefined,
}

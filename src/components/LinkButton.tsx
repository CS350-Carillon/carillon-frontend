'use client'

import { Button } from '@mui/material'
import React from 'react'

export default function LinkButton({
  children,
  href,
  onClick,
  style,
  disabled,
}: {
  children: React.ReactNode
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  style?: React.CSSProperties
  disabled?: boolean
}) {
  const localOnClick = disabled ? undefined : onClick
  const localHref = disabled ? undefined : href
  const localStyle = disabled ? { background: 'gray' } : {}

  return (
    <Button
      variant="contained"
      style={{
        ...style,
        ...localStyle,
        width: '300px',
        height: '45px',
        textTransform: 'none',
      }}
      onClick={localOnClick}
      href={localHref}
    >
      {children}
    </Button>
  )
}

LinkButton.defaultProps = {
  href: undefined,
  onClick: undefined,
  style: undefined,
  disabled: false,
}

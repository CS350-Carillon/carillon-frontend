'use client'

import { Button } from '@mui/material'
import React from 'react'

export default function LinkButton({
  children,
  href,
  onClick,
  style,
}: {
  children: React.ReactNode
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  style?: React.CSSProperties
}) {
  return (
    <Button
      variant="contained"
      style={{
        ...style,
        width: '300px',
        height: '45px',
        textTransform: 'none',
      }}
      onClick={onClick}
      href={href}
    >
      {children}
    </Button>
  )
}

LinkButton.defaultProps = {
  href: undefined,
  onClick: undefined,
  style: undefined,
}

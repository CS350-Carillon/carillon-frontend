import { localPort } from '@/utils/constants'
import { io } from 'socket.io-client'

/* eslint-disable import/prefer-default-export */
export const socket = io(localPort)

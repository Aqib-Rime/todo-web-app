import { atom } from 'jotai'
import crypto from "crypto"

export const isLoggedIn = atom(true)
export const currentUserId = atom(crypto.randomBytes(20).toString('hex')) // TODO : we may need to get it from data


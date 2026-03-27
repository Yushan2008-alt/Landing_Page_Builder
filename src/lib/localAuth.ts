import { nanoid } from 'nanoid'

interface LocalUser {
  id: string
  email: string
  passwordHash: string
  createdAt: string
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

const USERS_KEY = 'lp_local_users'
const SESSION_KEY = 'lp_local_session'

function getUsers(): LocalUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]')
  } catch {
    return []
  }
}

export async function localSignUp(email: string, password: string) {
  const users = getUsers()
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { error: new Error('Email sudah terdaftar. Silakan login.'), user: null }
  }
  const passwordHash = await sha256(password)
  const user: LocalUser = {
    id: nanoid(),
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email }))
  return { error: null, user: { id: user.id, email: user.email } }
}

export async function localSignIn(email: string, password: string) {
  const users = getUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return { error: new Error('Email atau password salah.'), user: null }
  const passwordHash = await sha256(password)
  if (user.passwordHash !== passwordHash)
    return { error: new Error('Email atau password salah.'), user: null }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email }))
  return { error: null, user: { id: user.id, email: user.email } }
}

export function localSignOut() {
  localStorage.removeItem(SESSION_KEY)
}

export function getLocalUser(): { id: string; email: string } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

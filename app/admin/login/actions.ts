'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const validUsername = process.env.ADMIN_USERNAME
  const validPassword = process.env.ADMIN_PASSWORD

  if (!validUsername || !validPassword) {
    return { error: 'Admin credentials are not configured.' }
  }

  if (username !== validUsername || password !== validPassword) {
    return { error: 'Invalid username or password.' }
  }

  // Set a simple httpOnly session cookie
  const cookieStore = await cookies()
  cookieStore.set('admin_session', process.env.ADMIN_SESSION_SECRET ?? 'quantas-admin', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  redirect('/admin')
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin/login')
}

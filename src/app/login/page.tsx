'use client'
import React from 'react'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import LogInForm from './LogInForm'

export default function LoginPage() {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin')
    } catch(err) {
      setError('Invalid email or password.')
      console.error("Log in unsuccessful.", err)
    }
  }

  return (
    <div>
      {/*<h1>Log in</h1>*/}
      <LogInForm />
      {/*<form style={{ display: 'flex', flexDirection: 'column' }}>*/}
      {/*  <label>Email</label>*/}
      {/*  <input value={email}  onChange={e => setEmail(e.target.value)} />*/}
      {/*  <label>Password</label>*/}
      {/*  <input value={password} onChange={e => setPassword(e.target.value)} />*/}
      {/*  <button type='button' onClick={handleLogin}>Submit</button>*/}
      {/*  {error && <p>{error}</p>}*/}
      {/*</form>*/}
    </div>
  )
}
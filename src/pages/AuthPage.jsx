import React from 'react'
import Login from '../components/Login'

const AuthPage = () => {
  return (
    <div className='flex h-screen items-center justify-center gap-30'>
        <div><img src="/src/assets/userprofile.jpg" alt="" /></div>
        <div>
        <Login/>
        </div>
    </div>
  )
}

export default AuthPage
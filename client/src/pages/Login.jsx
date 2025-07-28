import React from 'react'

const Login = () => {
    const handleGoogleLogin = () => {
        window.open(`${import.meta.env.VITE_API_URL}/api/auth/google`, "_self")
    }
  return (
    <div onClick={handleGoogleLogin}>Google</div>
  )
}

export default Login
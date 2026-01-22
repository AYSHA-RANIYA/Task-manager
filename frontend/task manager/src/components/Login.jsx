import React, { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Email and password are required")
      return
    }

    try {
      const { data } = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err) {
    
      alert(err.response?.data?.message || "Login failed")
    }
  }

  return (
   
  <div className="auth-container">
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  </div>
)

}

export default Login

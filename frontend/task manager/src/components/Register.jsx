import React, { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      alert("All fields are required")
      return
    }

    try {
      const { data } = await API.post('/auth/register', { name, email, password })

      alert(data.message)
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed")
    }
  }

  return (
  <div className="auth-container">
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

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

      <button type="submit">Register</button>
    </form>
  </div>
)

}

export default Register

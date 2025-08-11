import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL

export default function Register(){
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const nav = useNavigate()
  async function submit(e){
    e.preventDefault();
    const res = await axios.post(`${API}/api/auth/register`, form)
    localStorage.setItem('token', res.data.token)
    nav('/')
  }
  return (
    <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:380}}>
      <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} placeholder="usuario" />
      <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="email" />
      <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="password" type="password" />
      <button type="submit">Registrarme</button>
    </form>
  )
}

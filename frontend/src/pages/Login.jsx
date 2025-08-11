import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const API = import.meta.env.VITE_API_URL

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' })
  const nav = useNavigate()
  async function submit(e){
    e.preventDefault();
    const res = await axios.post(`${API}/api/auth/login`, form)
    localStorage.setItem('token', res.data.token)
    nav('/')
  }
  return (
    <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:380}}>
      <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="email" />
      <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="password" type="password" />
      <button type="submit">Entrar</button>
    </form>
  )
}

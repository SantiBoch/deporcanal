import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const API = import.meta.env.VITE_API_URL

export default function Chat(){
  const { userId } = useParams()
  const [msgs, setMsgs] = useState([])
  const [text, setText] = useState('')
  useEffect(()=>{ const token = localStorage.getItem('token'); axios.get(`${API}/api/messages/with/${userId}`, { headers: { Authorization: `Bearer ${token}` } }).then(r=>setMsgs(r.data)) }, [userId])
  async function send(){
    const token = localStorage.getItem('token');
    await axios.post(`${API}/api/messages`, { toId: parseInt(userId), text }, { headers: { Authorization: `Bearer ${token}` } })
    setText('')
    const r = await axios.get(`${API}/api/messages/with/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
    setMsgs(r.data)
  }
  return (
    <div style={{maxWidth:480, margin:'0 auto'}}>
      <div style={{display:'grid', gap:6, marginBottom:12}}>{msgs.map(m=> <div key={m.id}><b>{m.fromId}:</b> {m.text}</div>)}</div>
      <div style={{display:'flex', gap:8}}><input value={text} onChange={e=>setText(e.target.value)} /><button onClick={send}>Enviar</button></div>
    </div>
  )
}

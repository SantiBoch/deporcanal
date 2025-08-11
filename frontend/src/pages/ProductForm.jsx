import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const API = import.meta.env.VITE_API_URL

export default function ProductForm(){
  const [form, setForm] = useState({ title:'', description:'', price:0, condition:'Usado - Bueno', category:'' })
  const [files, setFiles] = useState([])
  const nav = useNavigate()
  async function submit(e){
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k,v])=> fd.append(k, v))
    for (const f of files) fd.append('images', f);
    const token = localStorage.getItem('token')
    await axios.post(`${API}/api/products`, fd, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type':'multipart/form-data' }})
    nav('/')
  }
  return (
    <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:520}}>
      <input placeholder="Título" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
      <textarea placeholder="Descripción" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
      <input type="number" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} />
      <input placeholder="Categoría (p.ej. Fútbol)" value={form.category} onChange={e=>setForm({...form, category: e.target.value})} />
      <select value={form.condition} onChange={e=>setForm({...form, condition:e.target.value})}>
        <option>Nuevo</option>
        <option>Usado - Muy bueno</option>
        <option>Usado - Bueno</option>
      </select>
      <input type="file" multiple onChange={e=>setFiles(Array.from(e.target.files))} />
      <button type="submit">Publicar</button>
    </form>
  )
}

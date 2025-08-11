import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Marketplace from './pages/Marketplace'
import ProductForm from './pages/ProductForm'
import Chat from './pages/Chat'

export default function App(){
  return (
    <div style={{fontFamily:'Inter, system-ui, Arial', padding:16}}>
      <header style={{display:'flex', gap:16, alignItems:'center', marginBottom:24}}>
        <h1 style={{margin:0}}><Link to="/">DeporCanal</Link></h1>
        <nav style={{display:'flex', gap:12}}>
          <Link to="/register">Registro</Link>
          <Link to="/login">Login</Link>
          <Link to="/new">Vender</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Marketplace/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/new" element={<ProductForm/>} />
        <Route path="/chat/:userId" element={<Chat/>} />
      </Routes>
    </div>
  )
}

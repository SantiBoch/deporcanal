import React, { useEffect, useState } from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL

export default function Marketplace(){
  const [list, setList] = useState([])
  useEffect(()=>{ axios.get(`${API}/api/products`).then(r=>setList(r.data)) }, [])
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:16}}>
      {list.map(p=> (
        <div key={p.id} style={{border:'1px solid #ddd', borderRadius:8, padding:12}}>
          <h3 style={{margin:'0 0 8px 0'}}>{p.title} — {p.price}€</h3>
          {p.images?.[0] && <img src={`${API}${p.images[0]}`} alt="" style={{height:160, objectFit:'cover', width:'100%'}}/>}
          <p>{p.description}</p>
          <p>Vendedor: {p.owner?.username}</p>
        </div>
      ))}
    </div>
  )
}

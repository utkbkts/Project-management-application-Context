import React from 'react'
import "./Notfound.css"
import { NavLink } from 'react-router-dom'
const Notfound = () => {
  return (
    <div className='notfound'>
      <h1>Üzgünüz böyle bir adres yok</h1>
      <h2><NavLink to="/">Anasayfaya Git</NavLink></h2>
    </div>
  )
}

export default Notfound
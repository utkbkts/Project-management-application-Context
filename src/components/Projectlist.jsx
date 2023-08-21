import React from 'react'
import "./Projectlist.css"
import {Link} from "react-router-dom"
import Avatar from "../components/Avatar.jsx"
const Projectlist = ({projeler}) => {
  return (
    <div className='project-list'>
        {projeler.length===0 && <p>Henüz proje eklenmedi</p>}
        {projeler.map(proje=>(
           <Link to={`/project/${proje.id}`} key={proje.id}>
            <h4>{proje.isim}</h4>
            <p>{proje.Bitistarihi.toDate().toLocaleString("tr-TR",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
            <div className='project-user'>
                <ul>
                    {proje.projekullanicilistesi.map(k=>(
                        <li key={k.photoURL}>
                            <Avatar src={k.photoURL}/>
                        </li>
                    ))}
                </ul>
            </div>
           </Link>
        ))}
    </div>
  )
}

export default Projectlist
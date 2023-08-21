import React from 'react'
import "./Onlineuser.css"
import Avatar from "./Avatar"
import { useCollection } from '../hooks/UseCollection'
const Onlineuser = () => {
    const {isPending,error,documents}=useCollection("kullaniclar");
    
  return (
    <div className='user-list'>
        <h2>Kullanıcı Listesi</h2>
        {isPending && <div>Kullanıcılar yükleniyor</div>}
        {error && <div>{error}</div>}
        {documents && documents.map(k=>(
           <div style={{marginBottom:"1rem"}}>
             <div key={k.id} className='user-list-item'>
                {k.online && <span className='online-user'></span>}
                <span>{k.kullaniciad}</span>
                <div className='avatar-user'>
                <Avatar src={k.photoURL}/>
                </div>
            </div>
           </div>
        ))}
    </div>
  )
}

export default Onlineuser
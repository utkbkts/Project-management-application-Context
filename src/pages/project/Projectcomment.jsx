import React, { useState } from 'react'
import {Timestamp} from "firebase/firestore"
import {useAuthContext} from "../../hooks/useAuthContext"
import {useFirestore} from "../../hooks/UseFirestore"

const Projectcomment = ({proje}) => {
    const {user}=useAuthContext()
    const [newcomment,setnewcomment]=useState("");
    const {response,dokumanguncelle}=useFirestore("projeler")
    
    const handlesubmit=async(e)=>{
        e.preventDefault()

        const yorumnesnesi={
            kullaniciad:user.displayName,
            photoURL:user.photoURL,
            yorumtext:newcomment,
            tarih:Timestamp.fromDate(new Date()),
            id:Math.random(),
        }
        await dokumanguncelle(proje.id,{
            yorumlar:[...proje.yorumlar,yorumnesnesi]
        })
        if(!response.error){
            setnewcomment("")
        }
    }
  return (
    <div className='project-comments'>
        <form className='add-comment' onSubmit={handlesubmit}>
            <label htmlFor="">
                <span>Yeni Yorum Ekle</span>
                <textarea value={newcomment} onChange={(e)=>setnewcomment(e.target.value)} required></textarea>
            </label>
            <button className='btn'>Yorum Ekle</button>
        </form>
    </div>
  )
}

export default Projectcomment
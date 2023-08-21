import Avatar from "../../components/Avatar"
import {useFirestore} from "../../hooks/UseFirestore"
import {useAuthContext} from "../../hooks/useAuthContext"
import {useNavigate} from "react-router-dom"
import React from 'react'

const Projectsummary = ({proje}) => {
  const {user}=useAuthContext()
  const navigate=useNavigate()
  const {dokumansil}=useFirestore("projeler")

  const handleclick=(e)=>{
    dokumansil(proje.id)
    navigate("/")
  }


  return (
    <div>
        <div className="project-summary">
            <h2 className="page-title">{proje.isim}</h2>
            <p>Oluşturan kişi:{proje.olusturan.kullaniciad}</p>
            <p>Proje Bitiş Tarihi:{proje.Bitistarihi.toDate().toLocaleString("tr-TR",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
            <p className="details">
                {proje.aciklama}
            </p>
            <h4>Proje Kullanıcıları:</h4>
            <div className="project-users">
             {proje.projekullanicilistesi.map(k=>(
                <div key={k.id}>
                    <Avatar src={k.photoURL}/>
                </div>
             ))}
            </div>
        </div>
        {user.uid===proje.olusturan.id&&(
          <button className="btn" onClick={handleclick}>Tamamla</button>
        )}
    </div>
  )
}

export default Projectsummary
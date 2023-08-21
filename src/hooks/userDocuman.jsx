import { useEffect,useState } from "react";
import {db} from "../firebase/config"
import {doc,onSnapshot} from "firebase/firestore"

export const useDocument=(koleksiyon,id)=>{
    const [document,setdocument]=useState(null)
    const [error,seterror]=useState(null)

    useEffect(()=>{
        const ref = doc(db,koleksiyon,id);

        const unsub=onSnapshot(ref,(doc)=>{
            if(doc.data()){
                setdocument({...doc.data(),id:doc.id})
                seterror(null)
            }else{
                seterror("Döküman bulunumadı.")
            }
        },err=>{
            console.log(err.message);
            seterror("Dökümana erişilemedi.")
        })
      return()=> unsub()
    },[koleksiyon,id])
    return {document,error}
}
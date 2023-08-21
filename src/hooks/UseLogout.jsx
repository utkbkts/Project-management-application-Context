import {useState } from "react";
import {auth,db} from '../firebase/config';
import { signOut } from "firebase/auth";
import {doc,updateDoc} from "firebase/firestore"
import {useAuthContext} from './useAuthContext'
export const uselogout=()=>{
    const [error,setError]=useState(null)
    const [isPending,setIsPending]=useState(false)
    const {dispatch,user}=useAuthContext();

    const logout=async()=>{
        
        setError(null)
        setIsPending(true)

        try {
            const {uid}=user;
            await updateDoc(doc(db,"kullaniclar",uid),{
                online:false
            })
            await signOut(auth)

            dispatch({type:"LOGOUT"})

            setIsPending(false)
            setError(null)
        } catch (error) {
            setError(error.message)
            setIsPending(false)
        }
    }
    return {logout,error,isPending}

}
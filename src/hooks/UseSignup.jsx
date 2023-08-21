import { useState, useEffect } from "react";
import { auth,storage,db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import {setDoc,doc} from "firebase/firestore"
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, userName,thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!response) {
        throw new Error("Üyelik gerçekleşmedi");
      }

      const filepath=`thumbnails/${response.uid}/${thumbnail.name}`
      const storageRef = ref(storage,filepath);
      await uploadBytes(storageRef,thumbnail);

      const imgUrl = await getDownloadURL(storageRef);


      updateProfile(response.user, {
        displayName: userName,
        photoURL:imgUrl
      });

      const docref=doc(db,"kullaniclar",response.user.uid)
      await setDoc(docref,{
        online:true,
        kullaniciad:userName,
        photoURL:imgUrl
      })


      dispatch({ type: "LOGIN", payload: response.user });
      setIsPending(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };
  return { error, isPending, signup };
};

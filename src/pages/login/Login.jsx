import React, { useEffect } from 'react'
import "./Login.css"
import { useState } from 'react'
import {useLogin} from "../../hooks/UseLogin"
import {slides} from "./Data.json"
const Login = () => {
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const { error, isPending, login } = useLogin();
  const [slide,setslide]=useState(0)
  const handlesubmit=(e)=>{
    e.preventDefault()
    login(email,password)
  }
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setslide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);
  const NextSlide=()=>{
    setslide(slide === slides.length - 1 ? 0: slide + 1)
  } 
  const PrevSlide=()=>{
    setslide(slide === slides.length - 1 ? 0: slide - 1)
  }
  return (
   <div className='content-login'>
     <form className='login'  onSubmit={handlesubmit}>
       <div className='header-login'>
       <h2>Giriş Sayfası</h2>
       </div>
        <label htmlFor="">
          <span>Email:</span>
          <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" name="email" required />
          <span>parola:</span>
          <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" name="password" required />
        </label>
        <div className='buttons'>
        {!isPending&&<button className='btn' type='submit'>Giriş Yap</button>}
        {isPending&&<button className="loading">Giriş Yapılıyor</button>}
        {error && <div className="error">{error}</div>}
        </div>
    </form>
    <div className='rightslider'>
      {slides.map((item,idx)=>{
        return <img src={item.src} key={idx} alt="" className={slide === idx ? "slide":"slide-hidden"}/>
      })}
      <span className='indicators'>
        {slides.map((_,idx)=>{
          return <button className={slide === idx ? "indicator":"indicator indicator-inactive"} key={idx} onClick={()=>setslide(idx)}></button>
        })}
      </span>
    </div>
   </div>
  )
}

export default Login
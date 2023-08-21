import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useSignup } from "../../hooks/UseSignup";
import {slides} from "../login/Data.json"

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    thumbnail: null,
  });

  const [thumbnailerror, setthumbnailerror] = useState(null);
  const { error, isPending, signup } = useSignup();
  const [slide,setslide]=useState(0)
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handlefile = (e) => {
    const secilen = e.target.files[0];
    setForm((prevForm) => ({
      ...prevForm,
      thumbnail: secilen,
    }));
    // console.log(secilen);
    if (!secilen) {
      setthumbnailerror("Lütfen bir tane resim dosyası seçiniz");
      return;
    }
    if (!secilen.type.includes("image")) {
      setthumbnailerror("Lütfen resim dosyası seçiniz");
      return;
    }
    setthumbnailerror(null);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (
      form.email !== "" &&
      form.password !== "" &&
      form.username !== "" &&
      form.thumbnail !== null
    ) {
      signup(form.email, form.password, form.username, form.thumbnail);
    }
  };
  return (
    <div className="content-login">
      <form className="login" onSubmit={handlesubmit}>
      <div className="header-login">
        <h2>Üye Olma Sayfası</h2>
      </div>
      <label htmlFor="username">
        <span>Username:</span>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={form.username}
          required
        />
      </label>
      <label htmlFor="email">
        <span>Email:</span>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          required
        />
      </label>
      <label htmlFor="password">
        <span>Password:</span>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          required
        />
      </label>

      <label htmlFor="thumbnail">
        <span>Profil Resminiz:</span>
        <input type="file" name="thumbnail" onChange={handlefile} />
        {form.thumbnail && <div><p>Seçilen Profil resmi: <img src={URL.createObjectURL(form.thumbnail)} alt="" /></p></div>}
        {thumbnailerror && <div className="error">{thumbnailerror}</div>}
      </label>
      <div className="buttons">
        {!isPending && <button className="btn" type="submit">Üye ol</button>}
        {isPending && <button className="loading">Yükleniyor</button>}
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
  );
};

export default Signup;

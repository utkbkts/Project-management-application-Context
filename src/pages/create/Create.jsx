import React, { useState } from "react";
import "./Create.css";
import Select from "react-select";
import { useCollection } from "../../hooks/UseCollection";
import { useEffect } from "react";
import {useAuthContext} from "../../hooks/useAuthContext"
import {useFirestore} from "../../hooks/UseFirestore";
import {useNavigate} from "react-router-dom"
const Create = () => {
  const navigate=useNavigate()
  const [veri, setveri] = useState({
    Projeismi: "",
    Projeaciklama: "",
    Bitistarihi: "",
    Category: "",
  });
  const {dokumanekle,response}=useFirestore("projeler")
  const [error, seterror] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]); 
  const {user} =useAuthContext()
  const categories = [
    { value: "masaüstü", label: "Masaüstü Yazılım" },
    { value: "web", label: "Web Yazılım" },
    { value: "mobil", label: "Mobil Yazılım" },
  ];
  const { documents } = useCollection("kullaniclar");

  const handlesubmit = async(e) => {
    e.preventDefault();
    seterror(null);
    if (!veri.Category) {
      seterror("Lütfen kategori seçiniz");
      return;
    }
    if (selectedUsers.length < 1) { 
      seterror("Lütfen kullanıcı seçiniz");
      return;
    }
    const olusturan={
      kullaniciad:user.displayName,
      photoURL:user.photoURL,
      id:user.uid
    }
    const projekullanicilistesi=selectedUsers.map((k)=>{
      return{
        kullaniciad:k.value.kullaniciad,
        photoURL:k.value.photoURL,
        id:k.value.id
      }
    })
    const yeniproje={
      isim:veri.Projeismi,
      aciklama:veri.Projeaciklama,
      kategori:veri.Category,
      Bitistarihi:new Date(veri.Bitistarihi),
      yorumlar:[],
      olusturan,
      projekullanicilistesi
    }
    await dokumanekle(yeniproje);
    if(!response.error){
      navigate("/")
    }
  };

  const handlechange = (name, value) => {
    setveri((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.kullaniciad };
      });
      setSelectedUsers(options); 
    }
  }, [documents]);
  return (
    <div className="proje-create">
      <h2>Proje Oluşturun</h2>
      <form className="project" onSubmit={handlesubmit}>
        <label htmlFor="">
          <span>Proje İsmi:</span>
          <input
            type="text"
            name="Projeismi"
            value={veri.Projeismi}
            onChange={(e) => handlechange("Projeismi", e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>Proje Açıklama:</span>
          <input
            type="text"
            name="Projeaciklama"
            value={veri.Projeaciklama}
            onChange={(e) => handlechange("Projeaciklama", e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>Bitiş Tarihi:</span>
          <input
            type="date"
            name="Bitistarihi"
            value={veri.Bitistarihi}
            onChange={(e) => handlechange("Bitistarihi", e.target.value)}
          />
        </label>
        <label htmlFor="" className="categories">
          <span>Kategori:</span>
          <Select
            placeholder="seçiniz"
            options={categories}
            onChange={(selectedOption) =>
              handlechange("Category", selectedOption.value)
            }
          />
        </label>
        <label htmlFor="">
          <span>Proje Kullanıcılar:</span>
          <Select
          required
            placeholder="Proje için kullanıcı seçiniz"
            options={selectedUsers}
            onChange={(selectedOptions) => setSelectedUsers(selectedOptions)}
            isMulti
          />
        </label>
        <button type="submit" className="btn">
          Proje Oluştur
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Create;

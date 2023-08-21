import React from 'react'
import "./Project.css"
import {useDocument} from "../../hooks/userDocuman"
import {useParams} from "react-router-dom"
import Projectsummary from './Projectsummary'
import Projectcomment from './Projectcomment'
import Projectcommentuser from './Projectcommentuser'
const Project = () => {

  const {id}=useParams();
  const {error,document}=useDocument("projeler",id)
  if(error){
    return <div className='error'>{error}</div>
  }
  if(!document){
    return <div className='loading'>Yükleniyor...</div>
  }
  return (
    <>
    <div className='project-details'>
      <div className='projectleft'>
      <Projectsummary  proje={document}/>
      </div>
      <div className='projectright'>
      <Projectcomment proje={document}/>
      </div>
    </div>
    <div>
         <Projectcommentuser proje={document}/> 
      </div>
    </>
  )
}

export default Project
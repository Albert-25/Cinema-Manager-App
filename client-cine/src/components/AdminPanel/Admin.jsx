import React,{useEffect}from 'react'
import Main from './componentsAdmin/main.jsx'
import {AdminContextProvider} from './admincontext.jsx'
import {useDispatch,useSelector} from 'react-redux'
import {AllMovies} from './../../store/actions'
import NavBar from './../Navbar/navbar.jsx'
import './Admin.css'


export default function Admin (){
  let dispatch =useDispatch()
  let {PelisAll}= useSelector(state=>state)
  useEffect(()=>{
    if(PelisAll.length<1){
      dispatch(AllMovies())
    }
  },[PelisAll])
	return (
       <AdminContextProvider>
          <div id="admin_section_container">
            <NavBar/>
            <Main/>
          </div>
       </AdminContextProvider>
   )
}

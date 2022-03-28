import React, { useEffect } from 'react'
import Main from './componentsAdmin/main.jsx'
import { AdminContextProvider } from './admincontext.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { AllMovies, GetAllCast, GetAllGenres } from './../../store/actions'
import NavBar from './../Navbar/navbar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css'


export default function Admin() {

  
  return (
    <AdminContextProvider>
      <div id="admin_section_container">
        <NavBar />
        <Main />
      </div>
    </AdminContextProvider>
  )
}

import React from 'react'
import Main from './componentsAdmin/main.jsx'
import { AdminContextProvider } from './admincontext.jsx'
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

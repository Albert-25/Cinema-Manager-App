import React from 'react'
import NavAdmin from './componentsAdmin/navadmin'
import Main from './componentsAdmin/main.jsx'
import {AdminContextProvider} from './admincontext.jsx'
import './Admin.css'


export default function Admin (){
	return (
		
       <AdminContextProvider>
          <div id="admin_section_container">
            <NavAdmin/>
            <Main/>
          </div>
       </AdminContextProvider>
   )
}

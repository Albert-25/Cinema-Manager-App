import React from 'react'
import {Container} from '@mui/material'
import CssBaseline from "@mui/material/CssBaseline";
import NavAdmin from './componentsAdmin/navadmin'
import Main from './componentsAdmin/main.jsx'
import {AdminContextProvider} from './admincontext.jsx'



export default function Admin (){
	return (
		
       <AdminContextProvider>
          <CssBaseline />
          <Container maxWidth="ls" sx={{ height: "100vh",backgroundColor:"lightgray"}}>
            <NavAdmin/>
            <Main/>
          </Container>
       </AdminContextProvider>
   )
}

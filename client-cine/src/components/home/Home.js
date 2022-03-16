import React from 'react'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../Navbar/navbar.jsx'

export const Home = () => {
  return(<React.Fragment>
  <CssBaseline/>
  <Container maxWidth="ls" sx={{height:"auto"}}>
    <Navbar/>
  </Container>
  </React.Fragment>)
}
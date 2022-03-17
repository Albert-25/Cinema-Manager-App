<<<<<<< HEAD
import MapView from '../mapView/MapView.js'



export const Home = () => {
  return (
  <div>
      <h1>Wellcome!!!</h1>
      <MapView />
</div>
  );
};
=======
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
>>>>>>> ce674fef3a101bb83d959465d79a62daab732e28

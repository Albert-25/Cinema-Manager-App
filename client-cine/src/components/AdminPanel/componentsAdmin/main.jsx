import React from 'react'
import Box from '@mui/material/Box';
import SelcetSectionBar from './sectionSelectBar.jsx'
import ItemsContainer from './itemcontainer.jsx'

export default function  Main(){
	
	return (
		<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"90vh",width:"100%",backgroundColor:"lightgray"}}>
		<Box sx={{height:"90%",width:"90%",backgroundColor:"rgba(41, 35, 94,0.7)",display:"inline-flex",flexDirection:"column"}}>
		  <SelcetSectionBar/>
		  <Box sx={{width:"100%",height:"fill-available",backgroundColor:"white",padding:"2em 1em 1em 0"}}>
		   <ItemsContainer/>
		  </Box>
		</Box>
	</Box>)
}
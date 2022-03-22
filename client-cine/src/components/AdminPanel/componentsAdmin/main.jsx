import React from 'react'
import Box from '@mui/material/Box';
import SelcetSectionBar from './sectionSelectBar.jsx'
import ItemsContainer from './itemcontainer.jsx'
import {BsArrowLeftShort} from 'react-icons/bs'
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom'

export default function  Main(){
    let nagivate= useNavigate()	
	return (
		<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"90vh",width:"100%",backgroundColor:"lightgray"}}>
		<Box sx={{height:"90%",width:"90%",backgroundColor:"rgba(41, 35, 94,0.7)",display:"inline-flex",flexDirection:"column",position:"relative"}}>
		  <IconButton
		  sx={{position:"absolute",top:"-40px",left:"-70px"}}
		  onClick={()=>nagivate('/')}
		  >
		    <BsArrowLeftShort/>
		    <span style={{fontSize:"18px"}}>home</span>
		  </IconButton>
		  <SelcetSectionBar/>
		  <Box sx={{width:"100%",height:"fill-available",backgroundColor:"white",padding:"2em 1em 1em 0"}}>
		   <ItemsContainer/>
		  </Box>
		</Box>
	</Box>)
}
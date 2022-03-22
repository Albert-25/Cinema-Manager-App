import React,{useContext} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {BsPlusCircle,BsPencilFill,BsTrash} from 'react-icons/bs'
import IconButton from '@mui/material/IconButton';
import {AdminContext} from './../admincontext.jsx'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const items = {
  peliculas: 'createmovies',
  generos: 'creategenero',
  actores: 'createactor',
}

let listMovies=["movie_example"]



const Items=({name,handleDelete})=>{
  return (<Item sx={{display:"flex",flexDirection:"rows",justifyContent:"space-between"}}>
    <h4>{name}</h4>
    <Box component="span" sx={{display:"flex",flexDirection:"rows",alignItems:"center"}}>
    <IconButton ><BsPencilFill style={{color:"blue"}} /></IconButton> <IconButton className={name} onClick={handleDelete}><BsTrash style={{color:"red"}} /></IconButton>
    </Box>
  </Item>)
}



export default function ItemsContainer() {
  let {state}= useContext(AdminContext)
  const navigate = useNavigate()

  const handleDelete = () => {}

  const handleCreate=()=>{ 
    console.log(items[state.section])
    navigate(`/admin/${items[state.section]}`)
   }

  return (
    <Box sx={{ width: '100%',height:"100%",position:"relative",padding:"1em"}}>
    <IconButton onClick={handleCreate} sx={{position:"absolute",top:"-30px",left:"40px" }}> <BsPlusCircle style={{color:"green",fontSize:"1.2em"}}/></IconButton>
      <Stack spacing={2} sx={{height:"100%",overflow:"auto"}}>
        {listMovies && listMovies.map(movie=><Items key={movie} name={movie} handleDelete={handleDelete}/>)}
      </Stack>
    </Box>
  );
}
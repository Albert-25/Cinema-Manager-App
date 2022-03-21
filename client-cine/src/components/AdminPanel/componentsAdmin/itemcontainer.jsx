import React,{useContext} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {BsPlusCircle,BsPencilFill,BsTrash} from 'react-icons/bs'
import IconButton from '@mui/material/IconButton';
import {AdminContext} from './../admincontext.jsx'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

let listMovies=["movie1","movie2","movie3","movie4","movie5","movie6","movie7","movie8","movie9"]

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
  console.log(state)



  const handleDelete=(e)=>{
    console.log(e.currentTarget.className.split(" ")[3])
    if(window.confirm(`Quieres eliminar el item: ${e.currentTarget.className.split(" ")[3]}`)){
      alert("Borrado")
    }else{
      alert("uff safo la peli")
    }
  }
  const handleCreate=(e)=>{
    if(window.confirm("Quieres crear algo?")){
      alert(" jodete, no se puede !")
    }else{
      alert("Bien ,igual no se puede XD")
    }
  }
  return (
    <Box sx={{ width: '100%',height:"100%",position:"relative",padding:"1em"}}>
    <IconButton onClick={handleCreate} sx={{position:"absolute",top:"-30px",left:"40px" }}> <BsPlusCircle style={{color:"green",fontSize:"1.2em"}}/></IconButton>
      <Stack spacing={2} sx={{height:"100%",overflow:"auto"}}>
        {listMovies.map(movie=><Items key={movie} name={movie} handleDelete={handleDelete}/>)}
      </Stack>
    </Box>
  );
}
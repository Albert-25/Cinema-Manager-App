import React,{useContext} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {BsPlusCircle,BsPencilFill,BsTrash} from 'react-icons/bs'
import IconButton from '@mui/material/IconButton';
import {AdminContext} from './../admincontext.jsx'
//import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import CardMedia from '@mui/material/CardMedia';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const items = {
  movies: 'createmovies',
  genres: 'creategenero',
  actors: 'createactor',
}

const Items=({nombre,titulo,genero,id,image,handleDelete})=>{
  return (<Item sx={{display:"flex",flexDirection:"rows",justifyContent:"space-between"}}>
    <Box component="span" sx={{display:"flex",flexDirection:"rows",alignItems:"center",gap:"0 1em"}}>
      {image&&<CardMedia
      component="img"
        sx={{ width: 70 ,marginRight:"1em"}}
        image={image}
        alt="Live from space album cover"
      />}
      {titulo&&<span style={{display:"flex",alignItems:"center",fontSize:"1.2em",gap:"0 0.5em"}}><h3>Titulo:</h3><p>{titulo}</p></span>}
      {nombre&&<span style={{display:"flex",alignItems:"center",fontSize:"1.2em",gap:"0 0.5em"}}><h3>Nombre:</h3><p>{nombre}</p></span>}
      {genero&&<span style={{display:"flex",alignItems:"center",fontSize:"1.2em",gap:"0 0.5em"}}><h3>Genero:</h3><p>{genero}</p></span>}
      <h4>ID: {id}</h4>
    </Box>  
    <Box component="span" sx={{display:"flex",flexDirection:"rows",alignItems:"center"}}>
    <IconButton ><BsPencilFill style={{color:"blue"}} /></IconButton> <IconButton className={nombre||titulo||genero} onClick={handleDelete}><BsTrash style={{color:"red"}} /></IconButton>
    </Box>
  </Item>)
}


export default function ItemsContainer() {
  let {state}= useContext(AdminContext)
  let {PelisAll,GenresAll,CastAll}= useSelector(state=>state)
  const navigate = useNavigate()

  const handleDelete = () => {}

  const handleCreate=()=>{ 
    console.log(items[state.section])
    navigate(`/admin/${items[state.section]}`)
   }
   console.log(state)
  return (
    <Box sx={{ width: '100%',height:"100%",position:"relative",padding:"1em"}}>
    <IconButton onClick={handleCreate} sx={{position:"absolute",top:"-30px",left:"40px" }}> <BsPlusCircle style={{color:"green",fontSize:"1.2em"}}/></IconButton>
      <Stack spacing={2} sx={{height:"100%",overflow:"auto"}}>
        {PelisAll && state.section==="movies" && PelisAll.map(movie=><Items key={movie.titulo} titulo={movie.titulo} image={movie.poster} id={movie.id} handleDelete={handleDelete}/>)}
        {GenresAll && state.section==="genres" && GenresAll.map(movie=><Items key={movie.genero+movie.id} genero={movie.genero}  id={movie.id} handleDelete={handleDelete}/>)}
        {CastAll &&  state.section==="actors" && CastAll.map(movie=><Items key={movie.nombre+movie.id} nombre={movie.nombre}  id={movie.id} handleDelete={handleDelete}/>)}
      </Stack>
    </Box>
  );
}
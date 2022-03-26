import React,{useContext} from 'react';
import {BsPlusCircle,BsPencilFill,BsTrash} from 'react-icons/bs'
import {AdminContext} from './../admincontext.jsx'
//import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Button,Stack,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './itemcontainer.css';
const items = {
  movies: 'createmovies',
  genres: 'creategenero',
  actors: 'createactor',
}

const Items=({nombre,titulo,genero,id,image,handleDelete})=>{
  return (
    <div className="item_admin_stack">
      <span className="item_admin_data_left">
        {image&&<Image
          src={image}
          thumbnail={true}
          alt="Live from space album cover"
         />}
         {titulo&&<span style={{display:"flex",alignItems:"flex-end",fontSize:"1.2em",gap:"0 0.5em"}}><h3>Titulo:</h3><p>{titulo}</p></span>}
         {nombre&&<span style={{display:"flex",alignItems:"flex-end",fontSize:"1.2em",gap:"0 0.5em"}}><h3>Nombre:</h3><p>{nombre}</p></span>}
        {genero&&<span style={{display:"flex",alignItems:"flex-end",fontSize:"1.2em",gap:"0 0.5em"}}><h3>Genero:</h3><p>{genero}</p></span>}
        <h4>ID: {id}</h4>
      </span>  
      <span className="item_admin_data_buttons_options" >
        <Button ><BsPencilFill style={{color:"blue"}} /></Button> <Button className={nombre||titulo||genero} onClick={handleDelete}><BsTrash style={{color:"red"}} /></Button>
      </span>
  </div>)
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
    <div className="item_admin_container_all">
    <Button className="item_admin_btn_create" onClick={handleCreate}> <BsPlusCircle style={{color:"green",fontSize:"1.2em"}}/></Button>
      <Stack className="item_admin_stack_container" gap={2}>
        {PelisAll && state.section==="movies" && PelisAll.map(movie=><Items key={movie.titulo} titulo={movie.titulo} image={movie.poster} id={movie.id} handleDelete={handleDelete}/>)}
        {GenresAll && state.section==="genres" && GenresAll.map(movie=><Items key={movie.genero+movie.id} genero={movie.genero}  id={movie.id} handleDelete={handleDelete}/>)}
        {CastAll &&  state.section==="actors" && CastAll.map(movie=><Items key={movie.nombre+movie.id} nombre={movie.nombre}  id={movie.id} handleDelete={handleDelete}/>)}
      </Stack>
    </div>
  );
}
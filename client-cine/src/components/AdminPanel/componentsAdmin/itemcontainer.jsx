import React,{useContext} from 'react';
import {BsPlusCircle,BsPencilFill,BsTrash} from 'react-icons/bs'
import {AdminContext} from './../admincontext.jsx'
//import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {Button,Stack,Image} from 'react-bootstrap';
import {removeActors} from '../../../store/actions'
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
        <Button bsPrefix  className="btn_options edit_option"><BsPencilFill style={{color:"blue",fontSize:"1.2em"}} /></Button> <Button bsPrefix className="btn_options delete_option" id={id} onClick={handleDelete}><BsTrash style={{color:"red",fontSize:"1.2em"}} /></Button>
      </span>
  </div>)
}


export default function ItemsContainer() {
  let {state}= useContext(AdminContext)
  let {PelisAll,GenresAll,CastAll}= useSelector(state=>state)
  const navigate = useNavigate()
  let dispatch=useDispatch()
  const handleDelete = (e) => {
    console.log(e.currentTarget.id)
    dispatch(removeActors(e.currentTarget.id))
  }

  const handleCreate=()=>{ 
    console.log(items[state.section])
    navigate(`/admin/${items[state.section]}`)
   }
  return (
    <div className="item_admin_container_all">
    <Button bsPrefix className="item_admin_btn_create" onClick={handleCreate}> <BsPlusCircle className="btnCreateAdminM"/></Button>
      <Stack className="item_admin_stack_container" gap={2}>
        {PelisAll && state.section==="movies" && PelisAll.map(movie=><Items key={movie.titulo} titulo={movie.titulo} image={movie.poster} id={movie.id} handleDelete={handleDelete}/>)}
        {GenresAll && state.section==="genres" && GenresAll.map(movie=><Items key={movie.genero+movie.id} genero={movie.genero}  id={movie.id} handleDelete={handleDelete}/>)}
        {CastAll &&  state.section==="actors" && CastAll.map(movie=><Items key={movie.nombre+movie.id} nombre={movie.nombre}  id={movie.id} handleDelete={handleDelete}/>)}
      </Stack>
    </div>
  );
}
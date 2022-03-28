import React,{useContext} from 'react';
import {BsPlusCircle,BsPencilFill,BsTrash} from 'react-icons/bs'
import {AdminContext} from './../admincontext.jsx'

import { useNavigate,Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {Button,Stack,Image} from 'react-bootstrap';
import {removeActors,removeMovie,removeGenres} from '../../../store/actions'
import Swal from "sweetalert2";
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
          className="image_item_Adm_movies"
          src={image}
          thumbnail
          alt="Live from space album cover"
         />}
         {titulo&&<span className="Item_movie_data_admin"><p><b>Titulo: </b>{titulo}</p></span>}
         {nombre&&<span className="Item_movie_data_admin"><p><b>Nombre: </b>{nombre}</p></span>}
        {genero&&<span className="Item_movie_data_admin"><p><b>Genero: </b>{genero}</p></span>}
        <h4>id: {id}</h4>
      </span>  
      <span className="item_admin_data_buttons_options" >
        <Link to={`/admin/editpelicula/${id}`}><Button bsPrefix  className={`btn_options edit_option ${id}`} ><BsPencilFill style={{color:"blue",fontSize:"1.2em"}} /></Button></Link> <Button bsPrefix className={`btn_options delete_option ${id}`} id={id} onClick={handleDelete}><BsTrash style={{color:"red",fontSize:"1.2em"}} /></Button>
      </span>
  </div>)
}


export default function ItemsContainer() {
  let {state}= useContext(AdminContext)
  let {PelisAll,GenresAll,CastAll}= useSelector(state=>state)
  const navigate = useNavigate()
  let dispatch=useDispatch()
  const handleDelete = (e) => {
    let ev= new Promise((resolve,rejected)=>{
      if(e.currentTarget.className.split(" ")[2]){
        resolve(e.currentTarget.className.split(" ")[2])
      }else{
        rejected("error")
      }
    }).then(res=>{
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
       }).then((result) => {
       if (result.isConfirmed) {
        console.log(res,state.section)
        state?.section === "actors" && dispatch(removeActors(res))
        state?.section === "movies" && dispatch(removeMovie(res))
        state?.section === "genres" && dispatch(removeGenres(res))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
       )
     }
   })

    },error=>console.log(error))
  }
  const handleCreate=()=>{ 
    console.log(items[state.section])
    navigate(`/admin/${items[state.section]}`)
   }
  return (
    <div className="item_admin_container_all">
    <Button bsPrefix className="item_admin_btn_create" onClick={handleCreate}> <BsPlusCircle className="btnCreateAdminM"/></Button>
      <Stack className="item_admin_stack_container" gap={2}>
        {PelisAll && state.section==="movies" && PelisAll.map(movie=><Items key={movie.titulo} titulo={movie.titulo} image={movie.poster} id={movie.id} handleDelete={handleDelete} />)}
        {GenresAll && state.section==="genres" && GenresAll.map(movie=><Items key={movie.genero+movie.id} genero={movie.genero}  id={movie.id} handleDelete={handleDelete}  />)}
        {CastAll &&  state.section==="actors" && CastAll.map(movie=><Items key={movie.nombre+movie.id} nombre={movie.nombre}  id={movie.id} handleDelete={handleDelete}  />)}
      </Stack>
    </div>
  );
}
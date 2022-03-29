<<<<<<< HEAD
import React,{useContext} from 'react';
import {BsPlusCircle} from 'react-icons/bs'
import {AdminContext} from './../admincontext.jsx'
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {Button,Stack,Spinner} from 'react-bootstrap';
import {removeActors,removeMovie,removeGenres,removeProduct} from '../../../store/actions'
=======
import React, { useContext } from 'react';
import { BsPlusCircle, BsPencilFill, BsTrash } from 'react-icons/bs'
import { AdminContext } from './../admincontext.jsx'

import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Stack, Image } from 'react-bootstrap';
import { removeActors, removeMovie, removeGenres, removeProduct } from '../../../store/actions'
>>>>>>> 9184c2df874d9a12921857047b7e2516e029e638
import Swal from "sweetalert2";
import Items from './items.jsx'
import Items2 from './items2.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './itemcontainer.css';
const items = {
  movies: 'createmovies',
  genres: 'creategenero',
  actors: 'createactor',
  products: 'createproducto'
}

<<<<<<< HEAD
export default function ItemsContainer() {
  let {state}= useContext(AdminContext)
  let {PelisAll,GenresAll,CastAll,ProductAll,PelisComments}= useSelector(state=>state)
=======
const Items = ({ nombre, titulo, genero, nombreProducto, id, image, handleDelete, stock }) => {
  return (
    <div className="item_admin_stack">
      <span className="item_admin_data_left">
        {image && <Image
          className="image_item_Adm_movies"
          src={image}
          thumbnail
          alt="Live from space album cover"
        />}
        {titulo && <span className="Item_movie_data_admin"><p><b>Titulo: </b>{titulo}</p></span>}
        {nombre && <span className="Item_movie_data_admin"><p><b>Nombre: </b>{nombre}</p></span>}
        {genero && <span className="Item_movie_data_admin"><p><b>Genero: </b>{genero}</p></span>}
        {nombreProducto && <span className="Item_movie_data_admin"><p><b>Nombre: </b>{nombreProducto}</p></span>}
        <h4>id: {id}</h4>
      </span>
      <span className="item_admin_data_buttons_options" >
        {titulo &&<><Link to={`/admin/editpelicula/${id}`}><Button bsPrefix  className={`btn_options edit_option ${id}`} ><BsPencilFill style={{color:"blue",fontSize:"1.2em"}} /></Button></Link> <Button bsPrefix className={`btn_options delete_option ${id}`} id={id} onClick={handleDelete}><BsTrash style={{color:"red",fontSize:"1.2em"}} /></Button></>}
        {nombre &&<><Link to={`/admin/editactor/${id}`}><Button bsPrefix  className={`btn_options edit_option ${id}`} ><BsPencilFill style={{color:"blue",fontSize:"1.2em"}} /></Button></Link> <Button bsPrefix className={`btn_options delete_option ${id}`} id={id} onClick={handleDelete}><BsTrash style={{color:"red",fontSize:"1.2em"}} /></Button></>}
        {genero &&<><Link to={`/admin/editgender/${id}`}><Button bsPrefix  className={`btn_options edit_option ${id}`} ><BsPencilFill style={{color:"blue",fontSize:"1.2em"}} /></Button></Link> <Button bsPrefix className={`btn_options delete_option ${id}`} id={id} onClick={handleDelete}><BsTrash style={{color:"red",fontSize:"1.2em"}} /></Button></>}
      </span>
    </div>)
}


export default function ItemsContainer() {
  let { state } = useContext(AdminContext)
  let { PelisAll, GenresAll, CastAll, ProductAll } = useSelector(state => state)
>>>>>>> 9184c2df874d9a12921857047b7e2516e029e638
  const navigate = useNavigate()
  let dispatch = useDispatch()
  const handleDelete = (e) => {
<<<<<<< HEAD
    let ev= new Promise((resolve,rejected)=>{
      if(e.currentTarget.className.split(" ")[1]){
        resolve(e.currentTarget.className.split(" ")[1])
      }else{
=======
    let ev = new Promise((resolve, rejected) => {
      if (e.currentTarget.className.split(" ")[2]) {
        resolve(e.currentTarget.className.split(" ")[2])
      } else {
>>>>>>> 9184c2df874d9a12921857047b7e2516e029e638
        rejected("error")
      }
    })
    ev.then(res => {
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
          console.log(res, state.section)
          state?.section === "actors" && dispatch(removeActors(res))
          state?.section === "movies" && dispatch(removeMovie(res))
          state?.section === "genres" && dispatch(removeGenres(res))
          state?.section === "products" && dispatch(removeProduct(res))
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    }, error => console.log(error))
  }
<<<<<<< HEAD
  const handleCreate=()=>{ 
    navigate(`/admin/${items[state.section]}`)
   }
   console.log(state.section)
=======
  const handleCreate = () => {
    console.log(items[state.section])
    navigate(`/admin/${items[state.section]}`)
  }
>>>>>>> 9184c2df874d9a12921857047b7e2516e029e638
  return (
    <div className="item_admin_container_all">
      <Button bsPrefix className="item_admin_btn_create" onClick={handleCreate}> <BsPlusCircle className="btnCreateAdminM" /></Button>
      <Stack className="item_admin_stack_container" gap={2}>
<<<<<<< HEAD
        {PelisAll && state.section==="movies" && PelisAll.map(movie=><Items key={movie.titulo} titulo={movie.titulo} image={movie.poster} id={movie.id} handleDelete={handleDelete} />)}
        {GenresAll && state.section==="genres" && GenresAll.map(movie=><Items key={movie.genero+movie.id} genero={movie.genero}  id={movie.id} handleDelete={handleDelete}  />)}
        {CastAll &&  state.section==="actors" && CastAll.map(movie=><Items key={movie.nombre+movie.id} nombre={movie.nombre}  id={movie.id} handleDelete={handleDelete}  />)}
        {ProductAll&& state.section ==="products"&& ProductAll.map(prod=><Items key={prod.nombre+prod.id} nombreProducto={prod.nombreProducto} image={prod.imagenProducto}  id={prod.id} handleDelete={handleDelete} />)}
        {PelisComments.length>0&& state.section === "comments"&&PelisComments.map(e=><Items key={e.nombre+"sdad2"} author={e.nombre} comment={e.comentario} score={e.puntuacion} id={e.id}/>)}
        {PelisComments.length<1&& state.section === "comments" && <Spinner animation="border" style={{margin:"0 auto"}} variant="secondary" />}
=======
        {PelisAll && state.section === "movies" && PelisAll.map(movie => <Items key={movie.titulo} titulo={movie.titulo} image={movie.poster} id={movie.id} handleDelete={handleDelete} />)}
        {GenresAll && state.section === "genres" && GenresAll.map(movie => <Items key={movie.genero + movie.id} genero={movie.genero} id={movie.id} handleDelete={handleDelete} />)}
        {CastAll && state.section === "actors" && CastAll.map(movie => <Items key={movie.nombre + movie.id} nombre={movie.nombre} id={movie.id} handleDelete={handleDelete} />)}
        {ProductAll && state.section === "products" && ProductAll.map(prod => <Items key={prod.nombre + prod.id} nombreProducto={prod.nombreProducto} image={prod.imagenProducto} id={prod.id} handleDelete={handleDelete} />)}
>>>>>>> 9184c2df874d9a12921857047b7e2516e029e638
      </Stack>
    </div>
  );
}
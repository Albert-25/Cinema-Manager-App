

import React, { useContext } from 'react';
import { BsPlusCircle, BsPencilFill, BsTrash } from 'react-icons/bs'
import { AdminContext } from './../admincontext.jsx'
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Stack, Image ,Spinner} from 'react-bootstrap';
import { removeActors, removeMovie, removeGenres, removeProduct, deleteUser} from '../../../store/actions'
import Swal from "sweetalert2";
import Items from './items.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './itemcontainer.css';
const items = {
  movies: 'createmovies',
  genres: 'creategenero',
  actors: 'createactor',
  products: 'createproducto'
}


export default function ItemsContainer() {
  let { state } = useContext(AdminContext)
  let { PelisAll, GenresAll, CastAll, ProductAll,PelisComments, FirebaseUsers } = useSelector(state => state)
  const navigate = useNavigate()
  let dispatch = useDispatch()
  console.log('SoyUsuarios', FirebaseUsers)
  const handleDelete = (e) => {
    console.log(e.currentTarget.className.split(" ")[1])
    let ev = new Promise((resolve, rejected) => {
      if (e.currentTarget.className.split(" ")[1]) {
        resolve(e.currentTarget.className.split(" ")[1])
      } else {
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
          state?.section === "users" && dispatch(deleteUser(res))

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    }, error => console.log(error))
  }

  const handleCreate = () => {
    console.log(items[state.section])
    navigate(`/admin/${items[state.section]}`)
  }

  return (
    <div className="item_admin_container_all">
      <Button bsPrefix className="item_admin_btn_create" onClick={handleCreate}> <BsPlusCircle className="btnCreateAdminM" /></Button>
      <Stack className="item_admin_stack_container" gap={2}>
        {PelisAll && state.section==="movies" && PelisAll.map(movie=><Items key={movie.titulo} titulo={movie.titulo} image={movie.poster} id={movie.id} handleDelete={handleDelete} />)}
        {GenresAll && state.section==="genres" && GenresAll.map(movie=><Items key={movie.genero+movie.id} genero={movie.genero}  id={movie.id} handleDelete={handleDelete}  />)}
        {CastAll &&  state.section==="actors" && CastAll.map(movie=><Items key={movie.nombre+movie.id} nombre={movie.nombre}  id={movie.id} handleDelete={handleDelete}  />)}
        {ProductAll&& state.section ==="products"&& ProductAll.map(prod=><Items key={prod.nombre+prod.id} nombreProducto={prod.nombreProducto} image={prod.imagenProducto}  id={prod.id} handleDelete={handleDelete} />)}
        {PelisComments.length>0&& state.section === "comments"&&PelisComments.map(e=><Items key={e.nombre+"sdad2"} author={e.nombre} comment={e.comentario} score={e.puntuacion} id={e.id}/>)}
        {PelisComments.length<1&& state.section === "comments" && <Spinner animation="border" style={{margin:"0 auto"}} variant="secondary" />}
        {FirebaseUsers&& state.section ==="users"&& FirebaseUsers.map(prod=><Items key={prod.id} nombreUsuario={prod.nombre} image={prod.imagen}  id={prod.id} correo={prod.correo} rol={prod.rol} handleDelete={handleDelete}/>)}
      </Stack>
    </div>
  );
}
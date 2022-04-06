import React, { useContext, useState, useEffect } from 'react';
import { BsPlusCircle } from 'react-icons/bs'
import { AdminContext } from './../admincontext.jsx'
import { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Stack, Spinner} from 'react-bootstrap';
import { useAuth } from "../../../contexts/AuthContext";
import { removeActors, removeMovie, removeGenres, removeProduct, deleteUser, deleteReview, deleteFunction} from '../../../store/actions'
import Swal from "sweetalert2";
import Items from './items.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './itemcontainer.css';
import axios from "axios"
import { toString } from "../../../utils/toString"

const { REACT_APP_BASE_URL } = process.env;
const items = {
  peliculas: 'createmovies',
  generos: 'creategenero',
  actores: 'createactor',
  productos: 'createproducto',
  users: 'createuser',
  funciones: 'createfunction',
}


export default function ItemsContainer() {
    const { user, currentUser } = useAuth();

  let { state } = useContext(AdminContext)
  let { PelisAll, GenresAll, CastAll, ProductAll,PelisComments, FirebaseUsers, FunctionsAll } = useSelector(state => state)
  const navigate = useNavigate()
  let dispatch = useDispatch()
  const [sales, setSales] = useState([])
  useEffect(() => {
    axios.get(`${REACT_APP_BASE_URL}/compras`)
      .then(res => {
        setSales(res.data)
      })
      .catch(err => console.error(err.data))
  }, [])
  const handleDelete = (e) => {

    let ev = new Promise((resolve, rejected) => {
      if (e.currentTarget.className.split(" ")[1]) {
        resolve(e.currentTarget.className.split(" ")[1])
      } else {
        rejected("error")
      }
    })
    ev.then(res => {
      if(res === user.uid){
        Swal.fire(
            'No puedes borrar tu propia cuenta',
            'Si necesitas borrar esta cuenta, pide ayuda a otro administrador',
            'error'
          )
       return 'Error'

      }
      Swal.fire({
        title: 'Estas seguro?',
        text: "¡Este cambio no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, ¡Bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
          state?.section === "actores" && dispatch(removeActors(res))
          state?.section === "peliculas" && dispatch(removeMovie(res))
          state?.section === "generos" && dispatch(removeGenres(res))
          state?.section === "productos" && dispatch(removeProduct(res))
          state?.section === "comments" && dispatch(deleteReview(res))


          state?.section === "funciones" && dispatch(deleteFunction(res))


          state?.section === "usuarios" && dispatch(deleteUser(res))

          Swal.fire(
            'Borrado!',
            'El elemento ha sido eliminado.',
            'success'
          )
        }if(state?.section !== "usuarios"){
        setTimeout(() => window.location.reload(), 1000)
      }
      })

    }, error => console.log(typeof(error)))
  }

  const handleCreate = () => {

    navigate(`/admin/${items[state.section]}`)
  }

  return (
    <div className="item_admin_container_all">
      {state.section !=="historial" ?<Button bsPrefix className="item_admin_btn_create" onClick={handleCreate}> <BsPlusCircle className="btnCreateAdminM" /></Button> : null}
      <Stack className="item_admin_stack_container" gap={2}>
        {PelisAll && state.section==="peliculas" && PelisAll.map(movie=><Items key={movie.titulo} titulo={movie.titulo} image={movie.poster} id={movie.id} handleDelete={handleDelete} />)}
        {GenresAll && state.section==="generos" && GenresAll.map(movie=><Items key={movie.genero+movie.id} genero={movie.genero}  id={movie.id} handleDelete={handleDelete}  />)}
        {CastAll &&  state.section==="actores" && CastAll.map(movie=><Items key={movie.nombre+movie.id} nombre={movie.nombre}  id={movie.id} handleDelete={handleDelete}  />)}
        {ProductAll&& state.section ==="productos"&& ProductAll.map(prod=><Items key={prod.nombre+prod.id} nombreProducto={prod.nombreProducto} image={prod.imagenProducto}  id={prod.id} handleDelete={handleDelete} />)}
        {PelisComments.length>0&& state.section === "comments"&&PelisComments.map(e=><Items key={e.nombre+"sdad2"} author={e.nombre} comment={e.comentario} score={e.puntuacion} id={e.id} handleDelete={handleDelete} />)}
        {PelisComments.length<1&& state.section === "comments" && <Spinner animation="border" style={{margin:"0 auto"}} variant="secondary" />}

        {FunctionsAll&& state.section ==="funciones"&& FunctionsAll.map(prod=><Items key={prod.id} id={prod.id} sala={prod.sala} horario={prod.horario} pelicula={prod.Peliculas[0].titulo} fecha={prod.fecha} asientos={prod.asientos} maxAsientos={prod.maxAsientos} />)}

        {FirebaseUsers&& state.section ==="usuarios"&& FirebaseUsers.map(prod=><Items key={prod.id} nombreUsuario={prod.nombre} image={prod.imagen}  id={prod.id} correo={prod.correo} rol={prod.rol} handleDelete={handleDelete}/>)}
        {state.section ==="historial" && sales.map(sale=><Items key={sale.id} client={sale.Nombre} products={toString(sale.products)} total={sale.total} email={sale.correo} verificado={sale.verificado}/>)}
      </Stack>
    </div>
  );
}
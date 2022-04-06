import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Button, Image } from 'react-bootstrap';
import { BsPencilFill, BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { AdminContext } from './../admincontext.jsx'
import { getAllReviewByIdOfMovie } from './../../../store/actions.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './itemcontainer.css';




const Items = ({ nombre, titulo, genero, nombreProducto, id, image, handleDelete, stock, author, score, comment, correo, rol, nombreUsuario, sala, horario, pelicula, asientos, maxAsientos, fecha }) => {
  let { dispatch } = useContext(AdminContext)
  let dispatchRedux = useDispatch()
  let [opcomment, setOpComment] = useState(false)
  const handleToComments = (e) => {
    dispatchRedux(getAllReviewByIdOfMovie(parseInt(e.currentTarget.className.split(" ")[1])))
    dispatch({ type: 'sectionSelect', payload: "comments" })
  }

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
        {author && <span className="Item_movie_data_admin"><p><b>Autor: </b>{author}</p></span>}
        {score && <span className="Item_movie_data_admin"><p><b>Puntuación: </b>{score}</p></span>}
        {nombre && <span className="Item_movie_data_admin"><p><b>Nombre: </b>{nombre}</p></span>}
        {correo && <span className="Item_movie_data_admin"><p><b>Correo: </b>{correo}</p></span>}
        {rol && <span className="Item_movie_data_admin"><p><b>rol: </b>{rol}</p></span>}
        {nombreUsuario && <span className="Item_movie_data_admin"><p><b>Nombre: </b>{nombreUsuario}</p></span>}
        {genero && <span className="Item_movie_data_admin"><p><b>Género: </b>{genero}</p></span>}
        {nombreProducto && <span className="Item_movie_data_admin"><p><b>Nombre: </b>{nombreProducto}</p></span>}
        {sala && <span className="Item_movie_data_admin"><p><b>Sala: </b>{sala}</p></span>}
        {horario && <span className="Item_movie_data_admin"><p><b>Horario: </b>{horario}</p></span>}
        {pelicula && <span className="Item_movie_data_admin"><p><b>Pelicula: </b>{pelicula}</p></span>}
        {fecha && <span className="Item_movie_data_admin"><p><b>Fecha: </b>{fecha}</p></span>}
        {asientos && <span className="Item_movie_data_admin"><p><b>Asientos: </b>{asientos}</p></span>}
        {maxAsientos && <span className="Item_movie_data_admin"><p><b>Máximos asientos: </b>{maxAsientos}</p></span>}



      </span>
      {opcomment && <span className="admin_box_comment">{comment}</span>}
      <span className="item_admin_data_buttons_options" >
        {author && <Button variant="outline-info" onClick={(e) => setOpComment(!opcomment)}> ver comentario</Button>}
        {titulo && <Button className={`btn_view_comments_admin ${id}`} variant="outline-secondary" onClick={handleToComments} >ir a comentarios</Button>}
        {titulo && <><Link to={`/admin/editpelicula/${id}`}><Button className={`btn_options ${id}`} variant="outline-primary"  ><BsPencilFill /></Button></Link> <Button className={`btn_options ${id}`} variant="outline-danger" id={id} onClick={handleDelete}><BsTrash /></Button></>}
        {nombre && <><Link to={`/admin/editactor/${id}`}><Button className={`btn_options ${id}`} variant="outline-primary"  ><BsPencilFill /></Button></Link> <Button className={`btn_options ${id}`} variant="outline-danger" id={id} onClick={handleDelete}><BsTrash /></Button></>}
        {genero && <><Link to={`/admin/editgender/${id}`}><Button className={`btn_options ${id}`} variant="outline-primary"  ><BsPencilFill /></Button></Link> <Button className={`btn_options ${id}`} variant="outline-danger" id={id} onClick={handleDelete}><BsTrash /></Button></>}
        {nombreProducto && <><Link to={`/admin/editproduct/${id}`}><Button className={`btn_options ${id}`} variant="outline-primary"  ><BsPencilFill /></Button></Link> <Button className={`btn_options ${id}`} variant="outline-danger" id={id} onClick={handleDelete}><BsTrash /></Button></>}
        {comment && <><Link to={`/admin/comment/edit/${id}`}><Button className={`btn_options ${id}`} variant="outline-primary"  ><BsPencilFill /></Button></Link> <Button className={`btn_options ${id}`} variant="outline-danger" id={id} onClick={handleDelete}><BsTrash /></Button></>}
        {nombreUsuario && <><Link to={`/admin/edituser/${id}`}><Button className={`btn_options ${id}`} variant="outline-primary"  ><BsPencilFill /></Button></Link> <Button className={`btn_options ${id}`} variant="outline-danger" id={id} onClick={handleDelete}><BsTrash /></Button></>}
        {sala && <><Link to={`/admin/editfunction/${id}`}><Button className={`btn_options ${id}`} variant="outline-primary"  ><BsPencilFill /></Button></Link> <Button className={`btn_options ${id}`} variant="outline-danger" id={id} onClick={handleDelete}><BsTrash /></Button></>}

      </span>
    </div>

  )
}
export default Items


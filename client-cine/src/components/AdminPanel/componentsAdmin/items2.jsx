import React from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {BsPencilFill,BsTrash} from 'react-icons/bs'
import 'bootstrap/dist/css/bootstrap.min.css';
import './itemcontainer.css';





export default function Items2({author,id ,score,comment,handleDelete}){
	const [view,setView]= React.useState(false)
	return (  <div className="item_admin_stack">
      <span className="item_admin_data_left">
         {author&&<span className="Item_movie_data_admin"><p><b>Author</b>:{author}</p> <p><b>Score:</b>{score}</p></span>}
      </span>  
      <span className="item_admin_data_buttons_options" >
        <Link to={`/admin/editpelicula/${id}`}><Button  className={`btn_options ${id}`} variant="outline-primary" ><BsPencilFill /></Button></Link> <Button  className={`btn_options delete_option ${id}`} id={id} variant="outline-danger" onClick={handleDelete}><BsTrash  /></Button>
      </span>
      {view &&<p className="admin_comment_author">{comment}</p>}
  </div>)
}
import React, { useContext } from 'react';
import {Nav} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { AdminContext } from '../admincontext'
import {cleanMovieComments} from './../../../store/actions.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './sectionSelectBar.css'



let status = ['peliculas', 'actores', 'generos','productos',"comentarios", 'usuarios', 'funciones', 'historial']


export default function SelectSectionBar() {
  const {dispatch,state} = useContext(AdminContext)
  let dispatchRedux= useDispatch()
  let {PelisComments} = useSelector(state=> state)
  let {section}=state 

  const handleChange = (value) => {
    if(value!=="comentarios" && PelisComments.length){
      dispatchRedux(cleanMovieComments())
    }
    dispatch({ type: 'sectionSelect', payload:value})  
  };

  return (
    <div className="section_admin_select_container">
       <Nav justify variant="tabs" activeKey={`${section}`}  onSelect={handleChange}>
          {status.map(e=> <Nav.Item key={e+"fv"}>{PelisComments.length<1&& e=== "comentarios"?<Nav.Link eventKey={e} disabled>{e.toUpperCase()}</Nav.Link>:<Nav.Link eventKey={e}>{e.toUpperCase()}</Nav.Link>}</Nav.Item>)}
        </Nav>
    </div>
  );

}
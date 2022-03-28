import React, { useEffect, useContext } from 'react';
import {Nav} from 'react-bootstrap';
import { AdminContext } from '../admincontext'
import 'bootstrap/dist/css/bootstrap.min.css';
import './sectionSelectBar.css'

let status = ['movies', 'actors', 'genres']

export default function SelectSectionBar() {
  const [value, setValue] = React.useState("movies");
  const {dispatch} = useContext(AdminContext)

  useEffect(() => {
    dispatch({ type: 'sectionSelect', payload:value})    
  }, [value,dispatch])

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <div className="section_admin_select_container">
       <Nav justify variant="tabs" defaultActiveKey="movies" onSelect={handleChange}>
          {status.map(e=><Nav.Item key={e+"f"}>
              <Nav.Link eventKey={e}  >{e.toUpperCase()}</Nav.Link>
          </Nav.Item>)}
        </Nav>
    </div>
  );

}
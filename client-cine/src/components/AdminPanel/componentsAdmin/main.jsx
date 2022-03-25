import React from 'react'
import SelectSectionBar from './sectionSelectBar.jsx'
import ItemsContainer from './itemcontainer.jsx'
import {BsArrowLeftShort} from 'react-icons/bs'
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import './main.css'
export default function  Main(){
    let nagivate= useNavigate()	
	return (
		<div className="main_admin_panel">
		<div className="main_container_panel_admin">
		  <Button bsPrefix="main_back_to_home_btn"  onClick={()=>nagivate('/')}>
		    <BsArrowLeftShort/>
		    <span style={{fontSize:"18px"}}>home</span>
		  </Button>
		  <SelectSectionBar/>
		  <div className="main_items_container_admin">
		   <ItemsContainer/>
		  </div>
		</div>
	</div>)
}
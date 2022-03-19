import React,{useState} from 'react'
import Button from '@mui/material/Button';
import SignIn from './signInForm.jsx'

export default function CallFormCtrl(){
	const [open,setOpen]=useState(false)
	const handleClose=(e)=>{
		setOpen(!open)
	}

	return (<>
		<Button
		variant="contained"
		size="small"
		onClick={handleClose}
		>
		SignIn
		</Button>
		{open?<SignIn status={open} handleClose={handleClose}/>:null}
		</>)
} 
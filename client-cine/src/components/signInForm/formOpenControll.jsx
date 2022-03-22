import React, { useState } from 'react'
import Button from '@mui/material/Button';
import SignIn from './signInForm.jsx'

export default function CallFormCtrl({ txt }) {
	const [open, setOpen] = useState(false)
	const handleClose = (e) => {
		setOpen(!open)
	}

	return (<>
		<Button
			variant="contained"
			size="small"
			onClick={handleClose}
		>
			{txt}
		</Button>
		{open
			? <SignIn status={open} handleClose={handleClose} txt={txt}/>
			: null
		}
	</>)
} 
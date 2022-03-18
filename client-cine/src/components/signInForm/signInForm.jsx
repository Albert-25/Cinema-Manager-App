import * as React from 'react';
import './formSignIn.css'
import {Button,
  Dialog,
  DialogTitle,
  Slide,
  FormControl,
  InputLabel,
  Input,
  DialogContent,FormHelperText,DialogActions,InputAdornment,IconButton} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {VisibilityOff,Visibility,Account} from '@mui/icons-material';
import {validator} from '../../utils/validator.js'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignIn({status,handleClose}) {
  const [open, setOpen] = React.useState(status);
  const [showPassword,setShowPass] =React.useState(false)
  const [data,setData]= React.useState({
    email:'',
    password:''
  })
  const [errors,setErros]= React.useState({email:"required",password:"required"})
  let handleClickShowPassword =(e)=>{
    setShowPass(!showPassword)
  }
  let handleChange=(e)=>{
    setData(prev=>{
         setErros(validator({...prev,[e.target.name]:e.target.value}))
            return {...prev,[e.target.name]:e.target.value}
      })
  }
  let handleSubmit=(e)=>{
    if(!data?.email||!data?.password && errors?.password||errors?.email){
      alert("warning , data not complete or errors present")
    }else{
      console.log(data)
    }
    setData({email:'',password:''})
  }

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{height:"max-content"}}
      >
      <DialogTitle sx={{textAlign:"center"}}>Sign In</DialogTitle>
      <DialogContent sx={{height:"200px",overflow:"revert"}}>
       <form id="login_form">
        <FormControl fullWidth>
          <InputLabel htmlFor="email__form__login">Email</InputLabel>
          <Input 
          id="email__form__login" 
          name="email" 
          type="email"
          onChange={handleChange}
          value={data.email}
          error={errors?.email?true:false}
          endAdornment={
            <InputAdornment position="end">
                <IconButton>
                 <AccountCircleIcon/>
                </IconButton>
            </InputAdornment>
          }
          />  
          <FormHelperText id="my-helper-email-login" sx={{color:"red"}} >{errors.email?errors.email+'*':null}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="password__form__login">Password</InputLabel>
          <Input 
          id="password__form__login" 
          name="password" 
          onChange={handleChange}
          value={data.password}
          type={showPassword?"text":"password"}
          error={errors?.password?true:false}
          endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />  
          <FormHelperText id="my-helper-password-login" sx={{color:"red"}}>{errors.password?errors.password+'*':null}</FormHelperText>
        </FormControl>
      </form>
      </DialogContent>
      <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>cancel</Button>
          <Button variant="outlined" color="success" type="submit" onClick={handleSubmit}>submit</Button>
      </DialogActions>
      </Dialog>
    </>
  );
}
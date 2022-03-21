import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CallFormCtrl from './../signInForm/formOpenControll.jsx'
import {Link} from 'react-router-dom';
import logo from "../../assets/popcorn.png"

let pages=["About"]
export default function Navbar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
   const [sizeScreen ,setSizeScreen]= React.useState(window.innerWidth)
    React.useEffect(()=>{
        let cancel=false
        window.addEventListener('resize',(e)=>{
            if(!cancel){
                setSizeScreen(window.innerWidth)
            }
        })
        return ()=>{cancel=true}
    })



  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['About'].map((text) => (
          <ListItem button key={text}>
            {/* <ListItemText primary={text} /> */}
            <Link to={`/${text.toLowerCase()}`}>{text}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 ,bgColor:"rgb(90, 154, 191)"}}>
      <AppBar position="static" sx={{flexDirection:"row",padding:"0 1em",justifyContent:"space-between",backgroundColor:"rgb(90, 154, 191)",boxShadow:"none",backdropFilter:"blur(10px)"}}>
        <Toolbar variant="dense">
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
          <Typography variant="h6" color="inherit" component="div">
            <img src={logo} alt="L2ogo"/>
          </Typography>
            {sizeScreen>=1024?pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center"><Link to={`/${page.toLowerCase()}`}>{page}</Link></Typography>
                </MenuItem>
              )):null}
        </Toolbar>
        <div>
        <CallFormCtrl txt={'SingUp'}/>
        <CallFormCtrl txt={'LogIn'}/>
         <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          sx={{marginRight:"1em"}}
        >
          <LocalGroceryStoreIcon />
        </IconButton>
         {sizeScreen<=1024?<IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2,right:"0" }} onClick={toggleDrawer("left", true)} >
            <MenuIcon />
        </IconButton>:null}
        </div>
      </AppBar>
    </Box>
  );
}
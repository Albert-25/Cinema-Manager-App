import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


let status=['generos','actores','peliculas']
export default function SelcetSectionBar(){
  const [value, setValue] = React.useState(0);

  useEffect(()=>{
      console.log(value)
  },[value])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'transparent',maxWidth:'350px',margin:"0 auto"}}>
      <Tabs value={value} onChange={handleChange} 
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="scrollable force tabs example">
        <Tab label="generos" sx={{color:'white'}} />
        <Tab label="actores" sx={{color:'white'}} />
        <Tab label="peliculas" sx={{color:'white'}} />
      </Tabs>
    </Box>
  );

}
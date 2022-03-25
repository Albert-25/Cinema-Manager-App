import React, { useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AdminContext } from '../admincontext'


let status = ['generos', 'actores', 'peliculas']

export default function SelcetSectionBar() {
  const [value, setValue] = React.useState(0);
  const {state, dispatch} = useContext(AdminContext)

  useEffect(() => {
    dispatch({ type: 'sectionSelect', payload: status[value]})    
  }, [value])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'transparent', maxWidth: '350px', margin: "0 auto" }}>
      <Tabs value={value} onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example">
        <Tab label="generos" sx={{ color: 'white' }} />
        <Tab label="actores" sx={{ color: 'white' }} />
        <Tab label="peliculas" sx={{ color: 'white' }} />
      </Tabs>
    </Box>
  );

}
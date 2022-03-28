import React, { useEffect } from 'react'
import Main from './componentsAdmin/main.jsx'
import { AdminContextProvider } from './admincontext.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { AllMovies, GetAllCast, GetAllGenres } from './../../store/actions'
import NavBar from './../Navbar/navbar.jsx'
import './Admin.css'


export default function Admin() {
  let dispatch = useDispatch()
  let { PelisAll } = useSelector(state => state)
  let { GenresAll } = useSelector(state => state)
  let { CastAll } = useSelector(state => state)
  useEffect(() => {
    if (PelisAll.length < 1) {
      dispatch(AllMovies())
    }
    if (GenresAll.length < 1) {
      dispatch(GetAllGenres())
    }
    if (CastAll.length < 1) {
      dispatch(GetAllCast())
    }
  }, [PelisAll, GenresAll, CastAll])
  
  return (
    <AdminContextProvider>
      <div id="admin_section_container">
        <NavBar />
        <Main />
      </div>
    </AdminContextProvider>
  )
}

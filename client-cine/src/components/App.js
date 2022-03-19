import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import  Home  from './home/Home'
import Review from "./Review/Review.jsx"
import DetailsMovies from "./Details/DetailsMovies"

export const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/review' element={<Review />} />
          <Route path='/DetailsMovie' element={<DetailsMovies />} />
      </Routes>
    </Router>
  )
}

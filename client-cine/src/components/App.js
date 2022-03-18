import React from "react";

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import  Home  from './home/Home.js'
import Review from "./Review/Review.jsx"
import ShoppingCart from "./ShoppingCart/ShoppingCart.jsx"

export const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/review' element={<Review />} />
          <Route path='/shoppingcart' element={<ShoppingCart />} />
      </Routes>
    </Router>
  )
}

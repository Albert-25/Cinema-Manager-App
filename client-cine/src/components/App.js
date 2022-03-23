import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateActor from "./CreateActor/CreateActor.jsx";
import CreateGenre from "./CreateGenre/CreateGenre.jsx";
import CreateMovies from "./CreateMovies/CreateMovies.js";
import DetailsMovies from "./Details/DetailsMovies";
import Home from "./home/Home.js";
import { Profile } from "./profile/Profile.js";
import { Admin } from "./admin/Admin.js";
import SobreNosotros from "./SobreNosotros/SobreNosotros.js";
import Review from "./Review/Review.jsx";
import ShoppingCart from "./ShoppingCart/ShoppingCart.jsx";
export const App = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/review" element={<Review />} />
            <Route path="/MovieDetails/:id" element={<DetailsMovies />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/about" element={<SobreNosotros />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/create-movies" element={<CreateMovies />} />
            <Route path="/admin/crearActor" element={<CreateActor />} />
            <Route path="/admin/crearGenero" element={<CreateGenre />} />
            <Route path="/portal" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
         </Routes>
      </Router>
   );
};

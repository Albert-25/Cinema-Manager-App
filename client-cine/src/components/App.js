import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateActor from "./CreateActor/CreateActor.jsx";
import CreateGenre from "./CreateGenre/CreateGenre.jsx";
import CreateMovies from "./CreateMovies/CreateMovies.js";
import CreateProduct from "./CreateProduct/CreateProduct.jsx";
import DetailsMovies from "./Details/DetailsMovies";
import ProductDetail from "./Products/ProductDetail";
import Home from "./home/Home.js";
import { Profile } from "./profile/Profile.js";
import SobreNosotros from "./SobreNosotros/SobreNosotros.js";
import Review from "./Review/Review.jsx";
import ShoppingCart from "./ShoppingCart/ShoppingCart.jsx";
import ProductsPage from "./Products/ProductsPage"

//Changes
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import PrivateUpdate from "./PrivateUpdate";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

import ReviewToShow from "./ReviewToShow/ReviewToShow.jsx";

import Admin from "./AdminPanel/Admin.jsx";
import { useDispatch } from "react-redux";

import {
  AllMovies,
  GetAllGenres,
  GetAllCast,
  FiltrarGenero,
  FiltrarCast,
  FiltrarGeneroYCast,
} from "./../store/actions";


export const App = () => {


  return (
    <Router>

      <AuthProvider>
        <Routes>
           /*Rutas agregadas*/
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route
             path="/update-profile"
             element={
               <PrivateUpdate component={UpdateProfile}>
                 <UpdateProfile />
               </PrivateUpdate>
             }
           />
           /*Rutas agregadas*/ /*Rutas privadas*/
           <Route
             path="/admin"
             element={
     <PrivateRoute component={Admin} rol={'admin'}>
                 
                 <Admin />
      </PrivateRoute>
             }
           />
           <Route
             path="/admin/createmovies"
             element={
        <PrivateRoute component={CreateMovies} rol={'admin'}>
                 <CreateMovies />
           </PrivateRoute>
             }
           />
           <Route
             path="/admin/createactor"
             element={
             
               <PrivateRoute component={CreateActor} rol={'admin'}>
                 <CreateActor />
             </PrivateRoute>
             }
           />
           <Route
             path="/admin/creategenero"
             element={
          
               <PrivateRoute component={CreateGenre } rol={'admin'}>
                 <CreateGenre />

              </PrivateRoute>
            }
          />
<<<<<<< HEAD
            <Route
             path="/admin/createproducto"
             element={
              <PrivateRoute component={CreateProduct} rol={"admin"}>
=======

            <Route
             path="/admin/createproducto"
             element={
              <PrivateRoute component={CreateProduct} rol={'admin'}>
>>>>>>> c1ccb47505424b0d9aa2af07953f508103853a94
                <CreateProduct />
              </PrivateRoute>
            }
          />
           /*Rutas privadas*/
          <Route path="/" element={<Home />} />
          <Route path="/productpage" element={<ProductsPage />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/MovieDetails/:id" element={<DetailsMovies />} />
          <Route path="/productpage/Products/:id" element={<ProductDetail />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/about" element={<SobreNosotros />} />
          <Route path="/portal" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>


  );
};



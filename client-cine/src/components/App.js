import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateActor from "./CreateActor/CreateActor.jsx";
import CreateGenre from "./CreateGenre/CreateGenre.jsx";
import CreateMovies from "./CreateMovies/CreateMovies.js";
import CreateProduct from "./CreateProduct/CreateProduct.jsx";
import DetailsMovies from "./Details/DetailsMovies";
import ProductDetail from "./Products/ProductDetail";
import Home from "./home/Home.js";
import SobreNosotros from "./SobreNosotros/SobreNosotros.js";
import Review from "./Review/Review.jsx";
import ShoppingCart from "./ShoppingCart/ShoppingCart.jsx";
import EditMovies from "./EditMovies/EditMovies.jsx";
import EditUsers from "./EditUsers/EditUsers.js";
import PrivateComment from "./PrivateComment.js";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import PrivateUpdate from "./PrivateUpdate";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import ProductsPage from "./Products/ProductsPage.js";

import ReviewToUpdate from "./ReviewToUpdate/ReviewToUpdate.jsx";
import Admin from "./AdminPanel/Admin.jsx";
import { useDispatch } from "react-redux";
import {
   AllMovies,
   GetAllGenres,
   GetAllCast,
   AllProducts,
   FutureReleases,
   allUsers,
} from "./../store/actions";
import { EditItem } from "./editItem/EditItem.jsx";
import { Success } from "./CheckOuts/Success.js";
import { Cancel } from "./CheckOuts/Cancel.js";
import { Cart } from "./cart/Cart"

const stringItems = localStorage.getItem("items")
// const stringItems = true

export const App = () => {

   let dispatch= useDispatch()
   useEffect(()=>{
      dispatch(AllMovies())
      dispatch(GetAllGenres())
      dispatch(GetAllCast())
      dispatch(AllProducts())
      dispatch(FutureReleases())
      dispatch(allUsers());
   }, [dispatch]);

   return (
      <>
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

                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/admin/creategenero"
                     element={

                        <PrivateRoute component={CreateGenre} rol={'admin'}>
                           <CreateGenre />

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
                     path="/admin/createproducto"
                     element={
                        <PrivateRoute component={CreateProduct} rol={'admin'}>
                           <CreateProduct />
                        </PrivateRoute>
                     }
                  />
                  
                  <Route
                     path="/admin/edituser/:id"
                     element={
                        <PrivateRoute component={EditUsers} rol={'admin'}>
                           <EditUsers />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/admin/editactor/:id"
                     element={
                        <PrivateRoute component={EditItem} rol={'admin'}>
                           <EditItem />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/admin/editgender/:id"
                     element={
                        <PrivateRoute component={EditItem} rol={'admin'}>
                           <EditItem />
                        </PrivateRoute>
                     }
                  />
                  <Route path="/review/:id" element={
                     <PrivateComment component={Review}>
                        <Review />
                     </ PrivateComment>
                  } />
           /*Rutas privadas*/

                  <Route path="/" element={<Home />} />
                  <Route path="/cancel" element={<Cancel />} />
                  <Route path="/Success" element={<Success />} />
                  <Route path="/productpage" element={<ProductsPage />} />
                  <Route path="/MovieDetails/:id" element={<DetailsMovies />} />
                  <Route path="/reviewtoupdate/:id" element={<ReviewToUpdate />} />
                  <Route path="/productpage/Products/:id" element={<ProductDetail />} />
                  <Route path="/shoppingcart" element={<ShoppingCart />} />
                  <Route path="/about" element={<SobreNosotros />} />
                  {/* <Route path="/cart" element={<Cart />} /> */}
               </Routes>
            </AuthProvider>
         </Router>
         {stringItems && <Cart/>}
      </>
         );
   
};

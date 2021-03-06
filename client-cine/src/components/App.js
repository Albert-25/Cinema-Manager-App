import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateActor from "./CreateActor/CreateActor.jsx";
import CreateGenre from "./CreateGenre/CreateGenre.jsx";
import CreateMovies from "./CreateMovies/CreateMovies.js";
import CreateUser from "./CreateUser/CreateUser.js";


import CreateProduct from "./CreateProduct/CreateProduct.jsx";
import DetailsMovies from "./Details/DetailsMovies";
import ProductDetail from "./Products/ProductDetail";
import Home from "./home/Home.js";
import SobreNosotros from "./SobreNosotros/SobreNosotros.js";
import Review from "./Review/Review.jsx";
import ShoppingCart from "./ShoppingCart/ShoppingCart.jsx";

//Changes
import EditMovies from './EditMovies/EditMovies.jsx'
import EditUsers from "./EditUsers/EditUsers.js";
import EditFunctions from "./EditFunctions/EditFunctions.js";

import CreateFunciones from "./CreateFuncion/CreateFuncion.jsx";

import PrivateComment from "./PrivateComment.js";

import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import PrivateUpdate from "./PrivateUpdate";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import ProductsPage from "./Products/ProductsPage.js";
import EditProducts from "./EditProducts/EditProducts.jsx";
import ReviewToUpdate from "./ReviewToUpdate/ReviewToUpdate.jsx";
import Admin from "./AdminPanel/Admin.jsx";
import { useDispatch } from "react-redux";
import {
  AllMovies,
  GetAllGenres,
  GetAllCast,
  AllProducts,
  FutureReleases,
  GetAllFunctions,
  allUsers,
} from "./../store/actions";
import { EditItem } from "./editItem/EditItem.jsx";
import { Success } from "./CheckOuts/Success.js";
import { Cancel } from "./CheckOuts/Cancel.js";
import { Cart } from "./cart/Cart";
import { CheckSale } from "./checksale/CheckSale.jsx";

export const App = () => {

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllMovies());
    dispatch(GetAllGenres());
    dispatch(GetAllCast());
    dispatch(AllProducts());
    dispatch(FutureReleases());
    dispatch(allUsers());
    dispatch(GetAllFunctions());

  }, [dispatch]);

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
 
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

            <Route
              path="/admin"
              element={
                <PrivateRoute component={Admin} rol={"admin"}></PrivateRoute>
              }
            />
            <Route
              path="/admin/creategenero"
              element={
                <PrivateRoute component={CreateGenre} rol={"admin"}>
                  <CreateGenre />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/createmovies"
              element={
                <PrivateRoute component={CreateMovies} rol={"admin"}>
                  <CreateMovies />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/createactor"
              element={
                <PrivateRoute component={CreateActor} rol={"admin"}>
                  <CreateActor />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/createproducto"
              element={
                <PrivateRoute component={CreateProduct} rol={"admin"}>
                  <CreateProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/createuser"
              element={
                <PrivateRoute component={CreateUser} rol={"admin"}>
                  <CreateUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/createfunction"
              element={
                <PrivateRoute component={CreateFunciones} rol={"admin"}>
                  <CreateFunciones />
                </PrivateRoute>
              }
            />
            

            <Route
              path="/admin/editfunction/:id"
              element={
                <PrivateRoute component={EditFunctions} rol={"admin"}>
                  <EditFunctions />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/editpelicula/:id"
              element={
                <PrivateRoute component={EditMovies} rol={"admin"}>
                  <EditMovies />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/edituser/:id"
              element={
                <PrivateRoute component={EditUsers} rol={"admin"}>
                  <EditUsers />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/editactor/:id"
              element={
                <PrivateRoute component={EditItem} rol={"admin"}>
                  <EditItem />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/editgender/:id"
              element={
                <PrivateRoute component={EditItem} rol={"admin"}>
                  <EditItem />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/comment/edit/:id"
              element={
                <PrivateRoute component={ReviewToUpdate} rol={"admin"}>
                  <ReviewToUpdate />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/editproduct/:id"
              element={
                <PrivateRoute component={EditProducts} rol={"admin"}>
                  <EditProducts />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/checksale/:uuid"
              element={
                <PrivateRoute component={CheckSale} rol={"admin"}>
                  <CheckSale />
                </PrivateRoute>
              }
            />

            <Route
              path="/review/:id"
              element={
                <PrivateComment component={Review}>
                  <Review />
                </PrivateComment>
              }
            />

            <Route path="/" element={<Home />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/Success" element={<Success />} />
            <Route path="/productpage" element={<ProductsPage />} />
            <Route path="/MovieDetails/:id" element={<DetailsMovies />} />
            <Route path="/reviewtoupdate/:id" element={<ReviewToUpdate />} />
            <Route
              path="/productpage/Products/:id"
              element={<ProductDetail />}
            />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/about" element={<SobreNosotros />} />
  
          </Routes>
        </AuthProvider>
      </Router>
      <Cart />
    </>
  );

};

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "../Navbar/navbar.jsx";
import Carousel from "../Carousel/Carousel.js"
import { Bilboard } from "../bilboard/Bilboard.jsx";
import { AllMovies, GetAllGenres, GetAllCast } from "../../store/actions";
import "./Home.css"

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(AllMovies());
    dispatch(GetAllGenres());
    dispatch(GetAllCast());
  }, []);

  return (
    <div className="Home__Background">
      <NavBar />
      <Carousel />
      <Bilboard />
    </div>
  );
};

export default Home;

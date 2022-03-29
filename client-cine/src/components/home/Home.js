import React from "react";
import NavBar from "../Navbar/navbar.jsx";
import Carousel from "../Carousel/Carousel.js"
import CarouselSmall from "../Carousel/CarouselSmall.js";
import { Bilboard } from "../bilboard/Bilboard.jsx";

import "./Home.css"


const Home = () => {
  return (
    <div className="Home__Background">
      <NavBar />
      <Carousel />
      <Bilboard />
      <CarouselSmall />
    </div>
  );
};

export default Home;

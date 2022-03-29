import React from "react";
import NavBar from "../Navbar/navbar.jsx";
import Carousel from "../Carousel/Carousel.js"
import { Bilboard } from "../bilboard/Bilboard.jsx";

import "./Home.css"

const Home = () => {

  const dispatch = useDispatch()

     const AllPelis = useSelector((state) => state.PelisAll)

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

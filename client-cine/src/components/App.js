import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateMovies from "./CreateMovies/CreateMovies.js";
import { Home } from "./home/Home.js";

export const App = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-movies" element={<CreateMovies />} />
         </Routes>
      </Router>
   );
};

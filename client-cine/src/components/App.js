import React from "react";
import SearchBar from "../components/SearchBar";
import BookData from "../components/SearchBar/Data.json";

 export function App() {
  return (
    <div className="App">
      <SearchBar placeholder="Ingrese nombre de la pelicula..." data={BookData} />
    </div>
  );
}

export default App;

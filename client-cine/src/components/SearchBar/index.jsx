//  import React, { useState } from "react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../store/actions";

import "./index.css";

export default function SearchBar(){
  const dispatch = useDispatch();
  const [title, setName] = useState("");

  function handleInputChange(e) {//cdo hay un cambio en el input, lo va renderizando
    e.preventDefault();
    console.log(title);
    setName(e.target.value);
  }
  
  function handleSubmit(e) {// cuando se presiona Buscar, se despacha la accion y busca  por name
    e.preventDefault();
    dispatch(searchByName(title));
    setName("");
  }
   console.log(title)

  return (
 
    <div className=".container">
    <form onSubmit={(e) => handleSubmit(e)} >
      <input className="searchBar" placeholder="Ingrese nombre de la pelicula..."  type="text" value={title}
          onChange={(e) => handleInputChange(e)}/>  
         <button className="search_btn" type="submit" >search</button>
      
    </form>
  </div>
  );
  }




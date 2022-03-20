import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postMovies } from "../../store/actions";
import "./CreateMovies.css";
const CreateMovies = () => {
   const [inputs, setInputs] = useState({
      titulo: "",
      sinopsis: "",
      poster: "",
      duracion: Number,
      clasificacion: "",
      director: "",
      puntuación: "",
      pais: "",
      distribuidora: "",
      trailer: "",
      genders: "test",
      actors: "test",
   });
   //const [poster, setPoster] = useState([]);
   const dispatch = useDispatch();

   /* useEffect(() => {
      fetch("http://localhost:3001/peliculas")
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.hasOwnProperty("msg")) {
               console.log("error message");
            } else {
               console.log(data);
               return setPoster([...data]);
            }
         });
   }, []); */

   const handleChange = (e) => {
      setInputs({
         ...inputs,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      /* const url = "http://localhost:3001/peliculas";
      fetch(url, {
         method: "POST", // or 'PUT'
         body: JSON.stringify(inputs), // data can be `string` or {object}!
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((data) => console.log(data));
      console.log(inputs); */
      dispatch(postMovies(inputs));
   };
   return (
      <div className="Create__Movies">
         <form
            onSubmit={(e) => handleSubmit(e)}
            onChange={(e) => handleChange(e)}
         >
            <input type="text" name="titulo" placeholder="Titulo" />
            <input type="text" name="sinopsis" placeholder="Sipnosis" />
            <input type="text" name="poster" placeholder="Poster" />
            <input type="number" name="duracion" placeholder="Duracion" />
            <input
               type="text"
               name="clasificacion"
               placeholder="Clasificacion"
            />
            <input type="text" name="director" placeholder="Director" />
            <input type="text" name="puntuación" placeholder="Puntuacion" />
            <input type="text" name="pais" placeholder="Pais" />
            <input
               type="text"
               name="distribuidora"
               placeholder="Distribuidora"
            />
            <input type="text" name="trailer" placeholder="Trailer" />
            <input type="submit" value="Crear pelicula" />
         </form>
         {/* {poster.length !== 0
            ? poster.map((el, index) => {
                 return (
                    <div
                       key={`${Date.now()}${el.titulo}${index}`}
                       className="Check__Movies"
                    >
                       <span>{el.titulo} </span>
                       <span>{el.sinopsis} </span>
                       <span>{el.director} </span>
                       <span>{el.pais} </span>
                       <span>{el.duracion} </span>
                       <span>{el.trailer} </span>
                    </div>
                 );
              })
            : null} */}
      </div>
   );
};

export default CreateMovies;

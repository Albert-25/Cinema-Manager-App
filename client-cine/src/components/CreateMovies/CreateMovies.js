import React, { useEffect, useState } from "react";

const CreateMovies = () => {
   const [inputs, setInputs] = useState({
      titulo: "",
      sinopsis: "",
      poster: "",
      duracion: Number,
      clasificacion: "",
      director: "",
      puntuacion: "",
      pais: "",
      distribuidora: "",
      trailer: "",
   });
   const [poster, setPoster] = useState([]);

   useEffect(() => {
      fetch("http://localhost:3001/peliculas")
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.hasOwnProperty("msg")) {
               console.log("error message");
            } else {
               return setPoster([...data]);
            }
         });
   }, []);

   const handleChange = (e) => {
      setInputs({
         ...inputs,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const url = "http://localhost:3001/peliculas";
      fetch(url, {
         method: "POST", // or 'PUT'
         body: JSON.stringify(inputs), // data can be `string` or {object}!
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((data) => console.log(data));
      console.log(inputs);
   };
   return (
      <div>
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
         {poster
            ? poster.map((el) => {
                 return (
                    <div key={Date.now()}>
                       <span>{el.titulo} </span>
                       <span>{el.sinopsis} </span>
                       <span>{el.director} </span>
                       <span>{el.pais} </span>
                       <span>{el.duracion} </span>
                       <span>{el.trailer} </span>
                    </div>
                 );
              })
            : null}
      </div>
   );
};

export default CreateMovies;

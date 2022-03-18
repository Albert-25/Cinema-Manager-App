import React from "react";

const CreateMovies = () => {
   return (
      <div>
         <form>
            <input type="text" name="titulo" placeholder="Titulo" />
            <input type="text" name="sipnosis" placeholder="Sipnosis" />
            <input type="text" name="poster" placeholder="Poster" />
            <input type="number" name="duracion" placeholder="Duracion" />
            <input
               type="text"
               name="clasificacion"
               placeholder="Clasificacion"
            />
            <input type="text" name="director" placeholder="Director" />
            <input type="text" name="puntuacion" placeholder="Puntuacion" />
            <input type="text" name="pais" placeholder="Pais" />
            <input
               type="text"
               name="distribuidora"
               placeholder="Distribuidora"
            />
            <input type="text" name="trailer" placeholder="Trailer" />
         </form>
      </div>
   );
};

export default CreateMovies;

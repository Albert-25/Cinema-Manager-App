import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postMovies } from "../../store/actions";
import "./CreateMovies.css";
import { validate } from "./validate";
import Swal from "sweetalert2";
const CreateMovies = () => {
   const [inputs, setInputs] = useState({
      titulo: "",
      sinopsis: "",
      poster: "",
      duracion: "",
      clasificacion: "",
      director: "",
      puntuación: "",
      pais: "",
      distribuidora: "",
      trailer: "",
      genders: "",
      actors: "",
   });
   const [errors, setErrors] = useState({
      titulo: "",
      sinopsis: "",
      poster: "",
      duracion: "",
      clasificacion: "",
      director: "",
      puntuación: "",
      pais: "",
      distribuidora: "",
      trailer: "",
      genders: "",
      actors: "",
      error: false,
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

      setErrors(
         validate({
            [e.target.name]: e.target.value,
         })
      );
      console.log(errors);
   };

   const handleClick = (e) => {
      setErrors(
         validate({
            ...inputs,
         })
      );
      console.log(errors);
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

      if (errors.error === false) {
         Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`,
         }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
               dispatch(postMovies(inputs));
               Swal.fire("La pelicula fue agregada!", "", "success");
            } else if (result.isDenied) {
               Swal.fire("La pelicula no fue agregada", "", "info");
            }
         });
      } else {
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ingrese correctamente los datos",
         });
      }
   };
   return (
      <div className="Create__Movies">
         <form
            onSubmit={(e) => handleSubmit(e)}
            onChange={(e) => handleChange(e)}
         >
            <div className="input__with__error">
               <input type="text" name="titulo" placeholder="Titulo" />
               {errors.titulo ? <span>{errors.titulo}</span> : null}
            </div>
            <div className="input__with__error">
               <input type="text" name="sinopsis" placeholder="Sipnosis" />
               {errors.sinopsis ? <span>{errors.sinopsis}</span> : null}
            </div>
            <div className="input__with__error">
               <input type="text" name="poster" placeholder="Poster" />
               {errors.poster ? <span>{errors.poster}</span> : null}
            </div>
            <div className="input__with__error">
               <input type="text" name="duracion" placeholder="Duracion" />
               {errors.duracion ? <span>{errors.duracion}</span> : null}
            </div>
            <div className="input__with__error">
               <input
                  type="text"
                  name="clasificacion"
                  placeholder="Clasificacion"
               />
               {errors.clasificacion ? (
                  <span>{errors.clasificacion}</span>
               ) : null}
            </div>
            <div className="input__with__error">
               <input type="text" name="director" placeholder="Director" />
               {errors.director ? <span>{errors.director}</span> : null}
            </div>
            <div className="input__with__error">
               <input type="text" name="puntuación" placeholder="Puntuación" />
               {errors.puntuación ? <span>{errors.puntuación}</span> : null}
            </div>
            <div className="input__with__error">
               <input type="text" name="pais" placeholder="Pais" />
               {errors.pais ? <span>{errors.pais}</span> : null}
            </div>
            <div className="input__with__error">
               <input
                  type="text"
                  name="distribuidora"
                  placeholder="Distribuidora"
               />
               {errors.distribuidora ? (
                  <span>{errors.distribuidora}</span>
               ) : null}
            </div>
            <div className="input__with__error">
               <input type="text" name="trailer" placeholder="Trailer" />
               {errors.trailer ? <span>{errors.trailer}</span> : null}
            </div>
            <div className="input__with__error">
               <input type="text" name="genders" placeholder="Genders" />
               {errors.genders ? <span>{errors.genders}</span> : null}
            </div>
            <div className="input__with__error">
               <input type="text" name="actors" placeholder="Actors" />
               {errors.actors ? <span>{errors.actors}</span> : null}
            </div>
            <input
               type="submit"
               value="Crear pelicula"
               onClick={(e) => handleClick(e)}
            />
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

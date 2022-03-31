import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdClear } from "react-icons/md";
import s from "./search.module.css";

const searchTitle = (t, a) => {
   if (t !== "")
      return a.filter((m) => m.titulo.toLowerCase().includes(t.toLowerCase()));
};

export const Search = ({ title, setTitle, items }) => {
   const movies = searchTitle(title.trim(), items) || [];

   return (
      <div className={s.container}>
         <Form.Control
            placeholder="Ingrese nombre de la pelicula..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
         />
         <Button
            variant="light"
            className="d-inline-block ml-3"
            onClick={() => setTitle("")}
         >
            <MdClear />
         </Button>

         <ul className={s.list}>
            {title.trim() !== "" && movies.length === 0 ? (
               <p className={s.item_list}>No se encontro ese titulo</p>
            ) : (
               movies.map((movie) => {
                  return (
                     <li key={movie.id}>
                        <Link
                           to={`MovieDetails/${movie.id}`}
                           className={s.item_list}
                        >
                           {movie.titulo}
                        </Link>
                     </li>
                  );
               })
            )}
         </ul>
      </div>
   );
};

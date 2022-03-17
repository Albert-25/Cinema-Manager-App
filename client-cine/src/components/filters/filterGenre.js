import React from "react";
import { useSelector } from "react-redux";

//Llamamos al archivo api creado con axios

export default function FiltroGeneros({ Generos, FiltradoGeneros }) {
  const Genres = useSelector((state) => state.GenresAll);
  return (
    <div>
      <select
        className="selectGenres"
        defaultValue={"DEFAULT"}
        onChange={(e) => FiltradoGeneros(e.target.value)}
      >
        <option className="selectFop">Sort by Genre!</option>
        {Genres && Genres.length &&
          Genres.map((item, index) => {
          return (
            <option className="selectFop" key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}

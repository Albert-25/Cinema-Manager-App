import React from "react";
import { useSelector } from "react-redux";
import {
  // FalseInfo,
  AllMovies,
} from "../../store/actions";
import "./filterGenre.css";

//Llamamos al archivo api creado con axios

export default function FiltroGeneros({
  Generos,
  FiltradoGeneros,
  FiltradoCast,
  FiltradoGenreAndCast,
}) {
  const Genres = useSelector((state) => state.GenresAll);
  const Cast = useSelector((state) => state.CastAll);
  let GenresName = Genres.map((e) => e.genero)
  let CastName = Cast.map((e) => e.nombre)

  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const [selectedCast, setSelectedCast] = React.useState([]);

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    if (selectedGenres.length !== 0 && selectedCast.length === 0) {
      setTimeout(() => {
        FiltradoGeneros(selectedGenres);
      }, 1000);
    } else if (selectedGenres.length === 0 && selectedCast.length !== 0) {
      setTimeout(() => {
        FiltradoCast(selectedCast);
      }, 1000);
    } else if (selectedGenres.length !== 0 && selectedCast.length !== 0) {
      let completeArray = [];
      completeArray.push(selectedGenres);
      completeArray.push(selectedCast);
      setTimeout(() => {
        FiltradoGenreAndCast(completeArray);
      }, 1000);
    } else {
      FiltradoGeneros();
    }
  };

  const changeCast = (evt) => {
    setSelectedCast((newCast) => [...newCast, evt.target.value]);
    document
      .getElementById(evt.target.value)
      .setAttribute("disabled", "disabled");
  };

  const changeGenres = (evt) => {
    setSelectedGenres((newGenre) => [...newGenre, evt.target.value]);
    document
      .getElementById(evt.target.value)
      .setAttribute("disabled", "disabled");
  };

  const handleOnClickGenres = (item) => {
    let index = selectedGenres.indexOf(item);
    let newArr = selectedGenres.filter(
      (e) => selectedGenres.indexOf(e) !== index
    );
    setSelectedGenres(newArr);
    document.getElementById(item).removeAttribute("disabled");
    document.getElementById("defaultGenres").selectedIndex = 0;
  };

  const handleOnClickCast = (item) => {
    let index = selectedCast.indexOf(item);
    let newArr = selectedCast.filter((e) => selectedCast.indexOf(e) !== index);
    setSelectedCast(newArr);
    document.getElementById(item).removeAttribute("disabled");
    document.getElementById("defaultCast").selectedIndex = 0;
  };

  return (
    <div>
    <div id='filterOptionsContainer'> 
      <form id="formDefault" onSubmit={handleOnSubmit}>
        <select
          id="defaultGenres"
          className="selectGenres"
          defaultValue={"DEFAULT"}
          onChange={(evt) => changeGenres(evt)}
        >
          <option value="DEFAULT" disabled className="selectFop">
            Sort by Genre!
          </option>
          {GenresName &&
            GenresName.length &&
            GenresName.map((item, index) => {
              return (
                <option
                  id={item}
                  className="selectFop"
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              );
            })}
        </select>

        <select
          id="defaultCast"
          className="selectCast"
          defaultValue={"DEFAULT"}
          onChange={(evt) => changeCast(evt)}
        >
          <option disabled value="DEFAULT" className="selectFop">
            Sort by Cast!
          </option>
          {CastName &&
            CastName.length &&
            CastName.map((item, index) => {
              return (
                <option
                  id={item}
                  className="selectFop"
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              );
            })}
        </select>
        <button type="submit">Apply filters</button>
      </form>
      </div>
      <div className="SelectedFilters">
        {selectedGenres &&
          selectedGenres.length !== 0 &&
          selectedGenres.map((item, index) => {
            return (
              <div key={index}>
                <p id='selectedG'>{item}</p>
                
                <button onClick={() => handleOnClickGenres(item)}>X</button>
              </div>
            );
          })}
        {selectedCast &&
          selectedCast.length !== 0 &&
          selectedCast.map((item, index) => {
            return (
              <div key={index}>
                <p id='selectedC'>{item}</p>
                <button onClick={() => handleOnClickCast(item)}>X</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

import React from "react";
import { useSelector } from "react-redux";

//Llamamos al archivo api creado con axios

export default function FiltroGeneros({ Generos, FiltradoGeneros, FiltradoCast, FiltradoGenreAndCast }) {
  const Genres = useSelector((state) => state.GenresAll);
  const Cast = useSelector((state) => state.CastAll);


  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const [selectedCast, setSelectedCast] = React.useState([]);
    console.log(selectedCast)

  const handleOnSubmit = (evt) => {
    evt.preventDefault()
    if(selectedGenres.length !== 0 && selectedCast.length === 0){
      setTimeout(() => {
          FiltradoGeneros(selectedGenres)
        }, 1000)
    }else if(selectedGenres.length === 0 && selectedCast.length !== 0){
      setTimeout(() => {
          FiltradoCast(selectedCast)
        }, 1000)
    }else if(selectedGenres.length !== 0 && selectedCast.length !== 0){
      let completeArray = [];
      completeArray.push(selectedGenres)
           completeArray.push(selectedCast);
      setTimeout(() => {
          FiltradoGenreAndCast(completeArray)
        }, 1000)
    }
  }

  const handleOnClickGenres = (item) => {
let index = selectedGenres.indexOf(item);
let newArr = selectedGenres.filter((e) => selectedGenres.indexOf(e) !== index);
setSelectedGenres(newArr)
  }

   const handleOnClickCast = (item) => {
let index = selectedCast.indexOf(item);
let newArr = selectedCast.filter((e) => selectedCast.indexOf(e) !== index);
setSelectedCast(newArr)
  }

  return (
    <div>
    <form onSubmit={handleOnSubmit}>
      <select
        className="selectGenres"
        defaultValue={"DEFAULT"}
        onChange={(evt) => 
          setSelectedGenres((newGenre) => [...newGenre, evt.target.value])}
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

      <select
        className="selectCast"
        defaultValue={"DEFAULT"}
        onChange={(evt) => 
          setSelectedCast((newCast) => [...newCast, evt.target.value])}
      >
        <option className="selectFop">Sort by Cast!</option>
        {Cast && Cast.length &&
          Cast.map((item, index) => {
          return (
            <option className="selectFop" key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <button type='submit'>Apply filters</button>
      </form>
      <div className='SelectedFilters'>
      {
        selectedGenres && selectedGenres.length && 
        selectedGenres.map((item, index) => {
          return (
          <li key={index}>
          <ul>{item}</ul>
          <button onClick={() => handleOnClickGenres(item)}>X</button>
          </li>
            )
        })
      }
      {
        selectedCast && selectedCast.length && 
        selectedCast.map((item, index) => {
          return (
          <li key={index}>
          <ul>{item}</ul>
          <button onClick={() => handleOnClickCast(item)}>X</button>
          </li>
            )
        })
      }
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMovies } from "../../store/actions";
import "./CreateMovies.css";
import { GetAllGenres, GetAllCast } from "../../store/actions";
import { validate } from "./validate";
import Swal from "sweetalert2";
import Axios from "axios";
import { Image } from "cloudinary-react";
const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

const CreateMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllGenres());
    dispatch(GetAllCast());
  }, [dispatch]);

  const Genres = useSelector((state) => state.GenresAll);
  const Cast = useSelector((state) => state.CastAll);

  const [inputs, setInputs] = useState({
    titulo: "",
    sinopsis: "",
    poster: "",
    background: "",
    duracion: "",
    clasificacion: "",
    director: "",
    puntuación: "",
    pais: "",
    distribuidora: "",
    trailer: "",
    genders: [],
    actors: [],
  });

  const [imagesSelected, setImagesSelected] = useState({
    poster: "",
    background: "",
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

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value.trim(),
    });

    setErrors(
      validate(
        {
          [e.target.name]: e.target.value,
        },
        errors,
        e.target.name
      )
    );
  };

  const changeArrayGenders = (evt) => {
    setInputs({
      ...inputs,
      [evt.target.name]: inputs.genders.concat(evt.target.value),
    });
    setErrors(
      validate(
        {
          ...inputs,
        },
        errors,
        "genders"
      )
    );
    document
      .getElementById(evt.target.value)
      .setAttribute("disabled", "disabled");
  };

  const changeArrayCast = (evt) => {
    setInputs({
      ...inputs,
      [evt.target.name]: inputs.actors.concat(evt.target.value),
    });
    setErrors(
      validate(
        {
          ...inputs,
        },
        errors,
        "actors"
      )
    );
    document
      .getElementsByName(evt.target.value)[0]
      .setAttribute("disabled", "disabled");
  };

  const handleOnClickGenres = (item) => {
    let index = inputs.genders.indexOf(item);
    let newArr = inputs.genders.filter(
      (e) => inputs.genders.indexOf(e) !== index
    );
    setInputs({ ...inputs, genders: newArr });

    document.getElementById(item).removeAttribute("disabled");
    document.getElementById("defaultGenres").selectedIndex = 0;
  };

  const handleOnClickCast = (item) => {
    let index = inputs.actors.indexOf(item);
    let newArr = inputs.actors.filter(
      (e) => inputs.actors.indexOf(e) !== index
    );
    setInputs({ ...inputs, actors: newArr });

    document.getElementsByName(item)[0].removeAttribute("disabled");
    document.getElementById("defaultGenres").selectedIndex = 0;
  };

  const handleClick = (e) => {
    setErrors(
      validate(
        {
          ...inputs,
        },
        errors,
        "submit"
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.error === false) {
      Swal.fire({
        title: "¿Quieres guardar la pelicula?",
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
        text: "Ingrese correctamente los datos por favor.",
      });
    }
  };

  const uploadImage = async (event) => {
    const formData = new FormData();
    formData.append("file", imagesSelected[event.target.name]);
    formData.append("upload_preset", "pyfniocg");
    await Axios.post(
      `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload`,
      formData
    ).then((response) => {
      setInputs({
        ...inputs,
        [event.target.name]: response.data.url,
      });
    });
  };

  return (
    <div className="Create__Movies">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input__with__error">
          <input
            type="text"
            name="titulo"
            onChange={(evt) => handleChange(evt)}
            placeholder="Titulo"
          />
          {errors.titulo ? <span>{errors.titulo}</span> : null}
        </div>
        <div className="input__with__error">
          <input
            type="text"
            name="sinopsis"
            onChange={(evt) => handleChange(evt)}
            placeholder="Sipnosis"
          />
          {errors.sinopsis ? <span>{errors.sinopsis}</span> : null}
        </div>
        <div className="image_upload_poster">
          <span>Poster:</span>
          <br/>
          <input
            type="file"
            name="poster"
            onChange={(event) => {
              setImagesSelected({
                ...imagesSelected,
                [event.target.name]: event.target.files[0],
              });
            }}
          />
          <button
            type="button"
            name="poster"
            onClick={(event) => uploadImage(event)}
          >
            Subir Imagen
          </button>
          <br/>
          {inputs.poster && <span>imagen cargada:</span>}
          <br/>
          <Image
            style={{ width: 200 }}
            cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
            publicId={inputs.poster}
          />
        </div>
        <div className="image_upload_background">
          <span>background:</span>
          <br/>
          <input
            type="file"
            name="background"
            onChange={(event) => {
              setImagesSelected({
                ...imagesSelected,
                [event.target.name]: event.target.files[0],
              });
            }}
          />
          <button
            type="button"
            name="background"
            onClick={(event) => uploadImage(event)}
          >
            Subir Imagen
          </button>
          <br/>
          {inputs.background && <span>imagen cargada:</span>}
          <br/>
          <Image
            style={{ width: 400 }}
            cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
            publicId={inputs.background}
          />
        </div>
        <div className="input__with__error">
          <input
            type="number"
            min="0"
            name="duracion"
            onChange={(evt) => handleChange(evt)}
            placeholder="Duracion"
          />
          {errors.duracion ? <span>{errors.duracion}</span> : null}
        </div>
        <div className="input__with__error">
          <input
            type="text"
            name="clasificacion"
            placeholder="Clasificacion"
            onChange={(evt) => handleChange(evt)}
          />
          {errors.clasificacion ? <span>{errors.clasificacion}</span> : null}
        </div>
        <div className="input__with__error">
          <input
            type="text"
            name="director"
            onChange={(evt) => handleChange(evt)}
            placeholder="Director"
          />
          {errors.director ? <span>{errors.director}</span> : null}
        </div>
        <div className="input__with__error">
          <input
            type="number"
            min="0"
            max="10"
            name="puntuación"
            onChange={(evt) => handleChange(evt)}
            placeholder="Puntuación"
          />
          {errors.puntuación ? <span>{errors.puntuación}</span> : null}
        </div>
        <div className="input__with__error">
          <input
            type="text"
            name="pais"
            onChange={(evt) => handleChange(evt)}
            placeholder="Pais"
          />
          {errors.pais ? <span>{errors.pais}</span> : null}
        </div>
        <div className="input__with__error">
          <input
            type="text"
            name="distribuidora"
            placeholder="Distribuidora"
            onChange={(evt) => handleChange(evt)}
          />
          {errors.distribuidora ? <span>{errors.distribuidora}</span> : null}
        </div>
        <div className="input__with__error">
          <input
            type="text"
            name="trailer"
            onChange={(evt) => handleChange(evt)}
            placeholder="Trailer"
          />
          {errors.trailer ? <span>{errors.trailer}</span> : null}
        </div>
        <div className="input__with__error">
          <select
            id="defaultGenres"
            name="genders"
            defaultValue={"DEFAULT"}
            onChange={(evt) => changeArrayGenders(evt)}
          >
            <option value="DEFAULT" disabled>
              Generos
            </option>
            {Genres &&
              Genres.map((item, index) => {
                return (
                  <option
                    id={item.id}
                    className="elemSelect"
                    key={`${item.genero}${index}`}
                    value={item.id}
                  >
                    {item.genero}
                  </option>
                );
              })}
          </select>
          {errors.genders ? <span>{errors.genders}</span> : null}
        </div>
        <div className="input__with__error">
          <select
            id="defaultCast"
            name="actors"
            defaultValue={"DEFAULT"}
            onChange={(evt) => changeArrayCast(evt)}
          >
            <option value="DEFAULT" disabled>
              Cast
            </option>
            {Cast &&
              Cast.map((item) => {
                return (
                  <option
                    name={item.id}
                    className="elemSelect"
                    key={item.nombre}
                    value={item.id}
                  >
                    {item.nombre}
                  </option>
                );
              })}
          </select>

          {errors.actors ? <span>{errors.actors}</span> : null}
        </div>
        <input
          type="submit"
          value="Crear pelicula"
          onClick={(e) => handleClick(e)}
        />
      </form>

      <div className="SelectedFilters">
        <div className="gendersChoosenContainer">
          {inputs.genders &&
            inputs.genders.length !== 0 &&
            inputs.genders.map((item, index) => {
              return (
                <div key={index}>
                  <p id="selectedG">{Genres[item - 1].genero}</p>

                  <button
                    className="close"
                    onClick={() => handleOnClickGenres(item)}
                  >
                    X
                  </button>
                </div>
              );
            })}
        </div>
        <div className="castChoosenContainer">
          {inputs.actors &&
            inputs.actors.length !== 0 &&
            inputs.actors.map((item, index) => {
              return (
                <div key={index}>
                  <p id="selectedC">{Cast[item - 1].nombre}</p>
                  <button
                    className="close"
                    onClick={() => handleOnClickCast(item)}
                  >
                    X
                  </button>
                </div>
              );
            })}
        </div>
      </div>

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

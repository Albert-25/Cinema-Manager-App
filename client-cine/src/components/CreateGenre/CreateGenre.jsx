import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadGenre } from "../../store/actions";
import { Link } from "react-router-dom";

function CreateGenre() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    genero: "",
  });

  const [error, setError] = useState(true);

  useEffect(() => {
    if (info.genero.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
  }, [info, setError]);

  function handleChange(e) {
    setInfo(() => {
      return { [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById("1").value='';
    dispatch(uploadGenre(info));
  }

  return (
    <div>
      <div>
        <h2>Crear Genero</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <span>Genero:</span>
          <input type="text" name="genero" id="1" onChange={handleChange} />
          {info.genero.length < 1 && <span>El campo no puede ser vacio</span>}
          <div>
            <button type="submit" disabled={error}>
              Crear
            </button>
          </div>
          <div>
            <Link to="/">
              <button>Regresar a Home</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGenre;

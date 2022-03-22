import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadActor } from "../../store/actions";
import { Link } from "react-router-dom";

function CreateActor() {
  const dispatch = useDispatch();
  const [actor, setActor] = useState({
    nombre: "",
  });

  const [error, setError] = useState(true);

  useEffect(() => {
    if (actor.nombre.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
  }, [actor, setError]);

  function handleChange(e) {
    setActor(() => {
      return { [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById("1").value='';
    dispatch(uploadActor(actor));
  }

  return (
    <div>
      <div>
        <h2>Crear Actor</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <span>Actor:</span>
          <input type="text" name="nombre" id="1" onChange={handleChange} />
          {actor.nombre.length < 1 && <span>El campo no puede ser vacio</span>}
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

export default CreateActor;

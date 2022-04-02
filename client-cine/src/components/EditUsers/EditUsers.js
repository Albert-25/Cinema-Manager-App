import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailedUser, updateUser } from "../../store/actions";
import "../CreateMovies/CreateMovies.css";
//import { validate } from "../CreateMovies/validate";
import Swal from "sweetalert2";
import Axios from "axios";
import { useParams } from "react-router";
import { Image } from "cloudinary-react";
const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

const EditUsers = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

   useEffect(() => {
    dispatch(detailedUser(id));
  }, [dispatch]);

  /*useEffect(() => {
    dispatch(detailedUser(id));
  }, [dispatch, id]);*/

  


  const userDetails = useSelector((state) => state.DetailedUser);


  const [imagesSelected, setImagesSelected] = useState({
    imagen: ""
  });

   const [inputs, setInputs] = useState({
    imagen: "",
    rol: "",
    nombre: ""
  });

  const [errors] = useState({
    nombre: "",
    imagen: "",
    correo: "",
    
    error: false,
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value.trim(),
    });
  };



  const checkInputs = () => {
    if (inputs.nombre === "" && userDetails.nombre !== undefined) {
      setInputs({
        ...inputs,
        nombre: userDetails.nombre,
      });
    }
    if (inputs.rol === "" && userDetails.rol !== undefined) {
      setInputs({
        ...inputs,
        rol: userDetails.rol,
      });
    }
    if (inputs.imagen === "" && userDetails.imagen !== undefined) {
      setInputs({
        ...inputs,
        imagen: userDetails.imagen,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkInputs()
    if (errors.error === false) {
      Swal.fire({
        title: "¿Quieres guardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(updateUser(id, inputs));
          Swal.fire("Usuario actualizado correctamente!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("No se pudo actualizar al usuario", "", "info");
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
        imagen: response.data.url,
      });
    });
  };

  return (
    <div className="Update_Movie">
      <form onSubmit={(e) => handleSubmit(e)}>
        <span>Nombre:</span>
        <div className="input__with__error">
          <input
            type="text"
            name="nombre"
            placeholder={userDetails.nombre}
            onChange={(evt) => handleChange(evt)}
          />
          {errors.nombre ? <span>{errors.nombre}</span> : null}
        </div>
        <span>Correo:</span>
        <div className="input__with__error">
          <input
            type="text"
            name="correo"
            onChange={(evt) => handleChange(evt)}
            placeholder={userDetails.correo}
          />
          {errors.correo ? <span>{errors.correo}</span> : null}
        </div>
        <div className="image_upload_profile">
          <span>Foto de perfil:</span>
          <br />
          <input
            type="file"
            name="imagen"
            onChange={(event) => {
              setImagesSelected({
                ...imagesSelected,
                [event.target.name]: event.target.files[0],
              });
            }}
          />
          <button
            type="button"
            name="imagen"
            onClick={(event) => uploadImage(event)}
          >
            Subir Imagen
          </button>
          <br />
          {inputs.imagen && <span>imagen cargada:</span>}
          <br />
          <Image
            style={{ width: 200 }}
            cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
            publicId={inputs.imagen}
          />
        </div>
        <p>Actual imágen de perfil:</p>
        <img src={detailedUser.imagen}
            style={{ width: 200 }}
            alt=''
          />
       
        
        
        <div className="input__with__error">
          <select
            id="roles"
            name="rol"
            defaultValue={"DEFAULT"}
            onChange={(evt) => handleChange(evt)}
          >
            <option value="DEFAULT" disabled>
              Rol
            </option>
           
                  <option
                    name='admin'
                    className="elemSelect"

                    value='admin'
                  >
                    Admin
                  </option>
                   <option
                    name='user'
                    className="elemSelect"
                    value="user"
                  >
                   Sser
                  </option>
               
          </select>

          {errors.rol ? <span>{errors.rol}</span> : null}
        </div>
        <input
          type="submit"
          value="Actualizar usuario"
          onClick={(e) => {
            checkInputs();
          }}
        />
      </form>

    
    </div>
  );
};

export default EditUsers;

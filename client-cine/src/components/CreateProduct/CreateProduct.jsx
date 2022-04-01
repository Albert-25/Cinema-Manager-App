import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Image } from "cloudinary-react";
import Axios from "axios";
import { uploadProduct } from "../../store/actions";
import { validate } from "./validate";

const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

function CreateProduct() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    nombreProducto: "",
    imagenProducto: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    isCombo: false,
  });

  const [errors, setErrors] = useState({
    nombreProducto: "",
    descripcion: "",
    precio: "",
    stock: "",
    error: false,
  });

  const [imageSelected, setImageSelected] = useState("");

  // useEffect(() => {
  //   if (info.nombreProducto.length > 0) {
  //     setErrors(false);
  //   } else {
  //     setError(true);
  //   }
  // }, [info, error]);

  function handleChange(e) {
    setInfo((prevInfo) => {
      return {
        ...prevInfo,
        [e.target.name]: e.target.value,
      };
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
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (errors.error === false) {
      dispatch(uploadProduct(info));
      
      document.getElementById("Batatas").reset();
    }
  }

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "pyfniocg");
    await Axios.post(
      `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload`,
      formData
    ).then((response) => {
      setInfo({
        ...info,
        imagenProducto: response.data.url,
      });
    });
  };

  return (
    <div>
      <div>
        <h2>Crear Producto</h2>
      </div>
      <div>
        <form id="Batatas" onSubmit={handleSubmit}>
          <div>
            <span>Nombre del producto:</span>
            <input
              type="text"
              name="nombreProducto"
              placeholder="Ingrese el nombre aquí..."
              id="1"
              onChange={handleChange}
            />
            {errors.nombreProducto ? (
              <span>{errors.nombreProducto}</span>
            ) : null}
            {/* {info.nombreProducto.length < 1 && <span>no puede ser vacio</span>} */}
          </div>
          <div className="image_upload_product">
            <span>Imagen del producto:</span>
            <br />
            <input
              type="file"
              name="imagenProducto"
              onChange={(event) => {
                setImageSelected(event.target.files[0]);
              }}
            />
            <button
              type="button"
              name="imagenProducto"
              onClick={(event) => uploadImage(event)}
            >
              Subir Imagen
            </button>
            <br />
            {info.imagenProducto && <span>imagen cargada:</span>}
            <br />
            <Image
              style={{ width: 200 }}
              cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
              publicId={info.imagenProducto}
            />
          </div>
          <div>
            <span>Descripcion del producto:</span>
            <textarea
              name="descripcion"
              id="3"
              placeholder="Ingrese una descripción para el producto..."
              onChange={handleChange}
            />
            {errors.descripcion ? <span>{errors.descripcion}</span> : null}
          </div>
          <div>
            <span>Precio:</span>
            <input
              type="number"
              name="precio"
              id="4"
              min="0.00"
              step="any"
              onChange={handleChange}
            />
            {errors.precio ? <span>{errors.precio}</span> : null}
          </div>
          <div>
            <span>Stock:</span>
            <input
              type="number"
              name="stock"
              id="5"
              min="0"
              onChange={handleChange}
            />
            {errors.stock ? <span>{errors.stock}</span> : null}
          </div>
          <div>
            <span>Es combo:</span>
            <input
              type="checkbox"
              name="isCombo"
              id="6"
              onChange={handleChange}
            />
          </div>
          <div>
            <button name="submit" type="submit" disabled={errors.error}>
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;

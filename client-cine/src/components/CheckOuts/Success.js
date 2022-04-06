import React, { useEffect, useState } from "react";
import { getRetrive, postBuy, AllProducts } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
// import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

export const Success = () => {
  const dispatch = useDispatch();
  // const UrlBuy = useSelector((state) => state.cartUrl);
  const RetriveItems = useSelector((state) => state.Retrive);
  // const { itemsCarrito } = useAuth();
  var informacion = localStorage.getItem("compra");

  var contador = 1;
  if (informacion && informacion !== undefined && contador === 1) {
    dispatch(getRetrive(informacion));
    contador = contador - 1;
    informacion = localStorage.removeItem("compra");
  }
  var storedNames = JSON.parse(localStorage.getItem("items"));

  if (
    RetriveItems &&
    RetriveItems.customer_details &&
    RetriveItems.payment_status === "paid"
  ) {
    let macaquito = {
      compra: {
        correo: RetriveItems.customer_details.email,
        Nombre: RetriveItems.customer_details.name,
        total: RetriveItems.amount_total,
        products: storedNames,
      },
    };
    let codigoUID = "equisde";
    // -------------------------------------------------
    axios.post("http://localhost:3001/compras", macaquito).then((response) => {
      codigoUID = response.data;
      let macaco = {
        email: RetriveItems.customer_details.email,
        name: RetriveItems.customer_details.name,
        price: RetriveItems.amount_total,
        products: storedNames,
        QR: `http://localhost:3000/admin/checksale/${codigoUID}`,
      };
      axios.post("http://localhost:3001/nodeMailer/send-email", macaco).then(
        (res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title:
              "Correo enviado al e-mail del comprador \n ¡gracias por su compra! \n Será redirigido a la pagina de Inicio \n\n no te olvides de revisar la carpeta de spam si no ves el correo",
            showConfirmButton: false,
            timer: 2500,
          });
          console.log("macaco", macaco)
          setTimeout(function () {
            window.location.href = "http://localhost:3000/";
            // aqui poner lo de restar stock
            let Productitos = []
            let Peliculitas = []
            for (let i = 0; i < macaco.products.length; i++) {
              if (macaco.products[i].imagenProducto) {
                Productitos.push(macaco.products[i])
              } else {
                Peliculitas.push(macaco.products[i])
              }
            }
            console.log("Productitos:", Productitos)
            console.log("Peliculitas:", Peliculitas)
            if (Productitos.length > 0) {
              for (let y = 0; y < Productitos.length; y++) {
                console.log("for", Productitos[y])
                axios.put("http://localhost:3001/productos/stock", Productitos[y])
              }
            }
            if (Peliculitas.length > 0) {
              for (let y = 0; y < Peliculitas.length; y++) {
                console.log("for", Peliculitas[y])
                axios.put("http://localhost:3001/funcion/stock", Peliculitas[y])
              }
            }
            // aqui poner lo de restar stock
            localStorage.removeItem("items");
          }, 5000);
        },
        (err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1000
          })
        }

      );
    });

    // -------------------------------------------------
  }

  const GettingRetrive = useSelector((state) => state.Retrive);

  return (
    <div>
      <img
        src={"https://acegif.com/wp-content/uploads/loading-23.gif"}
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

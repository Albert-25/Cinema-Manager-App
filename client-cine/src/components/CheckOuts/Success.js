import React, { useEffect, useState } from "react";
import { getRetrive, postBuy, AllProducts } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios"
// import QRCode from "qrcode"


export const Success = () => {
  const dispatch = useDispatch();
  const UrlBuy = useSelector((state) => state.cartUrl);
  const RetriveItems = useSelector((state) => state.Retrive)
  const { itemsCarrito } = useAuth();
  var informacion = localStorage.getItem('compra')

  // const ProductosTotales = useSelector((state) => state.ProductAll);
  console.log("prodctos comprados:", itemsCarrito)

  var contador = 1
  if (informacion && informacion !== undefined && contador === 1) {
    console.log("info", informacion)
    dispatch(getRetrive(informacion))
    contador = contador - 1
    // console.log(contador)
    informacion = localStorage.removeItem('compra')

  }
  var storedNames = JSON.parse(localStorage.getItem("items"));
  console.log("hello cosa extraña", RetriveItems)
  console.log("Hola cosas compradas:", storedNames)


  if (RetriveItems && RetriveItems.customer_details && RetriveItems.payment_status === "paid") {
    let macaquito = {
      compra: {
        correo: RetriveItems.customer_details.email,
        Nombre: RetriveItems.customer_details.name,
        total: RetriveItems.amount_total,
        products: storedNames
      },
    }
    let codigoUID = "equisde"
    // -------------------------------------------------
    axios.post("http://localhost:3001/compras", macaquito).then(
      (response) => {
        codigoUID = response.data
        let macaco = {
          email: RetriveItems.customer_details.email,
          name: RetriveItems.customer_details.name,
          price: RetriveItems.amount_total,
          products: storedNames,
          QR: codigoUID
        }
        axios.post("http://localhost:3001/nodeMailer/send-email", macaco).then(
          (res) => {
            console.log("send-email post")
            window.location.href = "http://localhost:3000/"
            localStorage.removeItem("items")
          },
          (err) => {
            alert(err);
          }
        );
        console.log("FINALMENTE, UN MACCACO", macaco)
      }
    )
    // -------------------------------------------------


  }



  const GettingRetrive = useSelector((state) => state.Retrive);


  // console.log("GettingUrl", UrlBuy)

  return (
    <div>
      <h1>Todo nice, viva amlo</h1>
    </div>
  );
};

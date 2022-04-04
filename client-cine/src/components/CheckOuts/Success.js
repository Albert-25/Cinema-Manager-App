import React, { useEffect, useState } from "react";
import { getRetrive, postBuy, AllProducts } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios"
import QRCode from "qrcode"


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
  var storedNames = JSON.parse(localStorage.getItem("BuyInfo"));
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



    async function Cosadecosas() {
      let res = await axios.post("http://localhost:3001/compras", macaquito)
      let data = JSON.parse(res.data)
      return data

    }
    codigoUID = Cosadecosas()




    console.log("codigooooooooooooooo, ", codigoUID)
    // QRCode.toDataURL(codigoUID)
    let codigoQR = QRCode.toDataURL(codigoUID).then(data => { codigoQR = data })

    let macaco = {
      email: RetriveItems.customer_details.email,
      name: RetriveItems.customer_details.name,
      price: RetriveItems.amount_total,
      products: storedNames,
      QR: codigoQR
    }
    console.log("FINALMENTE, UN MACCACO", macaco)

    axios.post("http://localhost:3001/nodeMailer/send-email", macaco).then(
      (res) => {
        console.log("send-email post")
      },
      (err) => {
        alert(err);
      }
    );
  }



  const GettingRetrive = useSelector((state) => state.Retrive);


  // console.log("GettingUrl", UrlBuy)

  return (
    <div>
      <h1>Todo nice, viva amlo</h1>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { getRetrive, postBuy, AllProducts } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";


export const Success = () => {
  const dispatch = useDispatch();
  const UrlBuy = useSelector((state) => state.cartUrl);
  const RetriveItems = useSelector((state) => state.Retrive)
  const { itemsCarrito} = useAuth();
  var informacion = localStorage.getItem('compra')


  // console.log('Estado cargado', informacion)
  // const ProductosTotales = useSelector((state) => state.ProductAll);
  console.log("prodctos comprados:", itemsCarrito)

  var contador = 1
  if (informacion && informacion !== undefined && contador === 1){
    console.log("info", informacion)
    dispatch(getRetrive(informacion))
    contador = contador - 1
    // console.log(contador)
    informacion = localStorage.removeItem('compra')

  }
  var storedNames = JSON.parse(localStorage.getItem("BuyInfo"));
  console.log("hello cosa extraña", RetriveItems)
  console.log("Hola cosas compradas:", storedNames)


  if(RetriveItems && RetriveItems.customer_details && RetriveItems.payment_status === "paid"){
    let macaco = {
      email: RetriveItems.customer_details.email,
      name: RetriveItems.customer_details.name,
      price: RetriveItems.amount_total,
      products: storedNames
    }
    console.log("FINALMENTE, UN MACCACO", macaco)
  }
  


  const GettingRetrive = useSelector((state) => state.Retrive);


  // console.log("GettingUrl", UrlBuy)

  return (
    <div>
      <h1>
        Todo nice, viva amlo
      </h1>
    </div>
  )
}

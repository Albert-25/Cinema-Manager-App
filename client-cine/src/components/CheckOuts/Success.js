import React, { useEffect, useState } from "react";
import { getRetrive, postBuy } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";




export const Success = () => {
  const dispatch = useDispatch();
  const UrlBuy = useSelector((state) => state.cartUrl);


  let contador = 0
  if (contador === 0){
    console.log("AAAAAAAAAAAAAHHG")
    dispatch(getRetrive(UrlBuy[1]))
    contador = 1
  }



  const GettingRetrive = useSelector((state) => state.Retrive);


  console.log("GettingUrl", UrlBuy)

  return (
    <div>
      <h1>
        Todo nice, viva amlo
      </h1>
    </div>
  )
}

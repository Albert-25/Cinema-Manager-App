import React, { useState, useEffect } from "react";
import {
  FalseInfo,
} from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

export const Home = () => {
//*dispatch de prueba para el holiwis que luego sera usado en mostar todas laspelis
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(FalseInfo());
  }, [dispatch]);
  const pelisfalsas = useSelector((state) => state.PelisAll);
  console.log(pelisfalsas) 
  //*

  return <h1>Wellcome!!!</h1>
}
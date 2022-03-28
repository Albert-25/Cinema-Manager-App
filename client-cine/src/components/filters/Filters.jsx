import React from "react";
import { useSelector } from "react-redux";

export const GenderFilter = ({ genders, setGenders, setPageSelected }) => {
  const gendersOptions = useSelector((state) => state.GenresAll) || [];

  const handleChange = (e) => {
    const { value } = e.target
    if (value === 'default') {
      setGenders([])
    } else {
      if (!genders.includes(value)) setGenders(prev => [...prev, e.target.value])
    } setPageSelected(1)
  }

  function handleClick(name) {
    setGenders(prev => [...prev.filter(act => act !== name)])
    setPageSelected(1)
  }

  return (
    <>
      <select onChange={handleChange} value="defaukt">
        <option>Filter by gender</option>
        {
          gendersOptions.map(item => {
            return (
              <option key={item.id}>{item.genero}</option>
            )
          })
        }
      </select>
      {
        genders.map(name => {
          return (
            <span key={name}>{name} <button onClick={() => handleClick(name)}>x</button> </span>
          )
        })
      }
    </>
  )
}

export const Actorsfilter = ({ actors, setActors, setPageSelected }) => {
  const actorsOptions = useSelector((state) => state.CastAll) || [];

  const handleChange = (e) => {
    const { value } = e.target
    if (value === 'default') {
      setActors([])
    } else {
      if (!actors.includes(value)) setActors(prev => [...prev, e.target.value])
    } setPageSelected(1)
  }

  function handleClick(name) {
    setActors(prev => [...prev.filter(act => act !== name)])
    setPageSelected(1)
  }


  return (
    <>
      <select onChange={handleChange} value="default">
        <option>Filter by actors</option>
        {
          actorsOptions.map(item => {
            return (
              <option key={item.id} value={item.nombre}>{item.nombre}</option>
            )
          })
        }
      </select>
      {
        actors.map(name => {
          return (
            <span key={name}>{name} <button onClick={() => handleClick(name)}>x</button> </span>
          )
        })
      }
    </>
  )
}

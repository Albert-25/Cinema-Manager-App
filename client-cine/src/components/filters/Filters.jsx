import React from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";

export const GenderFilter = ({ genders, setGenders, setPageSelected }) => {
   const gendersOptions = useSelector((state) => state.GenresAll) || [];

   const handleChange = (e) => {
      const { value } = e.target;
      if (value === "default") {
         setGenders([]);
      } else {
         if (!genders.includes(value))
            setGenders((prev) => [...prev, e.target.value]);
      }
      setPageSelected(1);
   };

   function handleClick(name) {
      setGenders((prev) => [...prev.filter((act) => act !== name)]);
      setPageSelected(1);
   }

   return (
      <>
         <Form.Select
            style={{
               display: "inline-block",
               width: "initial",
               marginLeft: "1.5rem",
            }}
            onChange={handleChange}
            value="default"
         >
            <option>Filter by gender</option>
            {gendersOptions.map((item) => {
               return <option key={item.id}>{item.genero}</option>;
            })}
         </Form.Select>
         <DropdownButton
            id="dropdown-basic-button"
            title={`${"Generos seleccionados:"} ${genders.length}`}
            className="d-inline-block"
         >
            {genders.length > 0 ? (
               genders.map((name) => {
                  return (
                     <>
                        <Dropdown.Item
                           key={name + parseInt(Math.random() * 100000)}
                           className="d-flex justify-content-between align-items-center"
                           onClick={() => handleClick(name)}
                        >
                           {name}
                           <MdCancel
                              style={{
                                 color: "#df1313",
                                 height: "100%",
                                 width: "auto",
                              }}
                           />
                        </Dropdown.Item>
                     </>
                  );
               })
            ) : (
               <Dropdown.Item className="d-flex justify-content-between">
                  {"Sin filtros por generos"}
               </Dropdown.Item>
            )}
         </DropdownButton>
      </>
   );
};

export const Actorsfilter = ({ actors, setActors, setPageSelected }) => {
   const actorsOptions = useSelector((state) => state.CastAll) || [];

   const handleChange = (e) => {
      const { value } = e.target;
      if (value === "default") {
         setActors([]);
      } else {
         if (!actors.includes(value))
            setActors((prev) => [...prev, e.target.value]);
      }
      setPageSelected(1);
   };

   function handleClick(name) {
      setActors((prev) => [...prev.filter((act) => act !== name)]);
      setPageSelected(1);
   }

   /* function handleClick(name) {
      setActors((prev) => [...prev.filter((act) => act !== name)]);
   } */

   return (
      <>
         <Form.Select
            style={{
               display: "inline-block",
               width: "initial",
            }}
            onChange={handleChange}
            value="default"
         >
            <option>Filter by actors</option>
            {actorsOptions.map((item) => {
               return (
                  <option key={item.id} value={item.nombre}>
                     {item.nombre}
                  </option>
               );
            })}
         </Form.Select>
         <DropdownButton
            id="dropdown-basic-button"
            title={`${"Actores seleccionados:"} ${actors.length}`}
            className="d-inline-block"
         >
            {actors.length > 0 ? (
               actors.map((name) => {
                  return (
                     <>
                        <Dropdown.Item
                           key={name + parseInt(Math.random() * 100000)}
                           className="d-flex justify-content-between align-items-center"
                           onClick={() => handleClick(name)}
                        >
                           {name}
                           <MdCancel
                              style={{
                                 color: "#df1313",
                                 height: "100%",
                                 width: "auto",
                              }}
                           />
                        </Dropdown.Item>
                     </>
                  );
               })
            ) : (
               <Dropdown.Item className="d-flex justify-content-between">
                  {"Sin filtros por actores"}
               </Dropdown.Item>
            )}
         </DropdownButton>
      </>
   );
};

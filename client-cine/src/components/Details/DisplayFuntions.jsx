import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Navbar } from "react-bootstrap";
import { updateCart } from "../../store/actions";
import { getItemsCart } from "../../utils/itemsCart";
import { FunctionsForm } from "./FunctionsForm";
import { ModalContainer } from "./Modal";

export const DisplayFuntions = ({ funtions, nameMovie, posterMovie }) => {
  const [showSelect, setShowSelect] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [ticket, setTicket] = useState({
    horario: '',
    quantity: 1,
    confirm: true
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (value !== 'defalut') {
      if (name !== 'confirm') {
        setTicket(prev => ({
          ...prev,
          [name]: value
        }))
      } else {
        setTicket(prev => ({
          ...prev,
          [name]: !ticket.confirm
        }))
      }

    }
  }

  let functionSelected
  if (ticket.horario) {
    functionSelected = funtions.find(f => f.horario === ticket.horario)
  }
  const handleSave = () => {
    const itemCart = {
      id: functionSelected.id,
      name: `${nameMovie} -- Horario: ${ticket.horario}`,
      price: functionSelected.precio,
      priceID: functionSelected.priceID,
      quantity: parseInt(ticket.quantity),
      imagen: posterMovie,
      stock: functionSelected.asientos,
    }
    const itemPP = {
      priceID: 'cambiar',
      quantity: ticket.quantity,
      name: `${nameMovie} -- Horario: ${ticket.horario}`
    }
    let items = getItemsCart("items")
    let restOfItems = items.filter(f => f.id !== functionSelected.id && f.name !== `${nameMovie} -- Horario: ${ticket.horario}`)
    let itemToChange = items.find(f => f.id == functionSelected.id && f.name == `${nameMovie} -- Horario: ${ticket.horario}`)
    let newItemCart = itemToChange
      ? {
        id: functionSelected.id,
        name: `${nameMovie} -- Horario: ${ticket.horario}`,
        price: functionSelected.precio,
        priceID: functionSelected.priceID,
        quantity: parseInt(ticket.quantity) + parseInt(itemToChange.quantity),
        imagen: posterMovie,
        stock: functionSelected.asientos,
      }
      : itemCart;
    let arrayToSend = restOfItems.concat(newItemCart);

    
    localStorage.setItem("items", JSON.stringify(arrayToSend))
    dispatch(updateCart(arrayToSend))
    navigate('/productpage')
  }

  return (
    <Navbar bg="transparent" expand={false} sticky="top">
      <Button variant="primary" onClick={() => setShowSelect(true)}>
        Reservar ticket
      </Button>
      <ModalContainer
        show={showSelect}
        handleClose={() => setShowSelect(false)}
        handleContinue={() => {
          setShowConfirm(true)
          setShowSelect(false)
        }}
        disabled={!ticket.horario}
      >
        <FunctionsForm
          handleChange={handleChange}
          horario={ticket.horario}
          quantity={ticket.quantity}
          funtions={funtions}
          asientos={functionSelected && functionSelected.asientos}
        />
      </ModalContainer>
      <ModalContainer
        show={showConfirm}
        handleClose={() => {
          setShowConfirm(false)
          setShowSelect(true)
        }}
        handleContinue={handleSave}
        disabled={ticket.confirm}
      >
        <Form.Check
          type="checkbox"
          name="confirm"
          value={ticket.confirm}
          onChange={handleChange}
          label={`Confirma la reserva de ${ticket.quantity} ${ticket.quantity === 1 ? 'asiento' : 'asientos'}`}
        />
      </ModalContainer>

//       <Container fluid>
//         <br />
//         <>
//           <Button variant="primary" onClick={() => setShow(true)}>
//             Reservar ticket
//           </Button>
//           <Modal show={show} fullscreen="xl-down">
//             <Modal.Body>
//               <Form>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Horario</Form.Label>
//                   <Form.Select
//                     onChange={handleChange}
//                     value={ticket.horario}
//                     name="horario"
//                   >
//                     <option value="default">Seleccione un horario</option>
//                     {funtions.map((e) => {
//                       return (
//                         <option key={e.id} value={e.horario}>
//                           {e.horario}
//                         </option>
//                       );
//                     })}
//                   </Form.Select>
//                 </Form.Group>
//                 {ticket.horario && <Form.Group className="mb-3">
//                   <Form.Label htmlFor="inputStok">{`Cantidad disponible (${functionSelected.asientos})`}</Form.Label>
//                   <Form.Control
//                     type="number"
//                     id="inputStok"
//                     min="1"
//                     max={functionSelected.asientos}
//                     value={ticket.quantity}
//                     name="quantity"
//                     onChange={handleChange}
//                   />
//                 </Form.Group>}
//               </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShow(false)}>
//                 Close
//               </Button>
//               <Button variant="primary" onClick={handleSave} disabled={!ticket.horario}>
//                 Continuar
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </>
//       </Container>

    </Navbar>
  );
};

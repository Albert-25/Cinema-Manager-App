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
  // console.log("coas:", funtions, nameMovie, posterMovie)
  const handleSave = () => {
    const itemCart = {
      id: functionSelected.id,
      name: `${nameMovie} -- Horario: ${ticket.horario}`,
      price: functionSelected.precio,
      priceID: functionSelected.priceID,
      quantity: ticket.quantity,
      imagen: posterMovie,
      stock: functionSelected.asientos,
    }
    const itemPP = {
      priceID: 'cambiar',
      quantity: ticket.quantity,
      name: `${nameMovie} -- Horario: ${ticket.horario}`
    }
    let itemsPP = getItemsCart("stripe")
    localStorage.setItem("stripe", JSON.stringify([...itemsPP, itemPP]))
    let items = getItemsCart("items")
    localStorage.setItem("items", JSON.stringify([...items, itemCart]))
    dispatch(updateCart([...items, itemCart]))
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
    </Navbar>
  );
};

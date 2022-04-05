import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Modal, Button, Form } from "react-bootstrap";
import { updateCart } from "../../store/actions";
import { getItemsCart } from "../../utils/itemsCart";

export const DisplayFuntions = ({ funtions, nameMovie, posterMovie }) => {
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState({
    horario: null,
    quantity: 1
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (value !== 'defalut') {
      setTicket(prev => ({
        ...prev,
        [name]: value
      }))
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

    // // let itemsPP = getItemsCart("stripe")
    // // localStorage.setItem("stripe", JSON.stringify([...itemsPP, itemPP]))
    // let items = getItemsCart("items")
    // localStorage.setItem("items", JSON.stringify([...items, itemCart]))
    // dispatch(updateCart([...items, itemCart]))
    navigate('/productpage')
  }


  return (
    <Navbar bg="transparent" expand={false} sticky="top">
      <Container fluid>
        <br />
        <>
          <Button variant="primary" onClick={() => setShow(true)}>
            Reservar ticket
          </Button>
          <Modal show={show} fullscreen="xl-down">
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Horario</Form.Label>
                  <Form.Select
                    onChange={handleChange}
                    value={ticket.horario}
                    name="horario"
                  >
                    <option value="default">Seleccione un horario</option>
                    {funtions.map((e) => {
                      return (
                        <option key={e.id} value={e.horario}>
                          {e.horario}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                {ticket.horario && <Form.Group className="mb-3">
                  <Form.Label htmlFor="inputStok">{`Cantidad disponible (${functionSelected.asientos})`}</Form.Label>
                  <Form.Control
                    type="number"
                    id="inputStok"
                    min="1"
                    max={functionSelected.asientos}
                    value={ticket.quantity}
                    name="quantity"
                    onChange={handleChange}
                  />
                </Form.Group>}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave} disabled={!ticket.horario}>
                Continuar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </Navbar>
  );
};

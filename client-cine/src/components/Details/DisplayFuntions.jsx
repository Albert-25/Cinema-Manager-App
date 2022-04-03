import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Modal, Button, Form } from "react-bootstrap";
import { updateCart } from "../../store/actions";
import { getItemsCart } from "../../utils/itemsCart";

export const DisplayFuntions = ({ funtions, nameMovie }) => {
  const [show, setShow] = useState(false);
  const [functionCine, setFunctionCine] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleSave = () => {
    
    const functionSelected = funtions.find(f => f.horario === functionCine)
    // Esta logica puede servir para añadir productos !!!
    const parsedItem = {
      id: `FuncionCine${functionSelected.id}`,
      name: `${nameMovie} -- Horario: ${functionSelected.horario}`,
      price: functionSelected.precio,
      quantity: 1
    }
    let items = getItemsCart()
    localStorage.setItem("items", JSON.stringify([...items, parsedItem]))
    dispatch(updateCart([...items, parsedItem]))
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

                  <Form.Label>Seleccione una función</Form.Label>
                  <Form.Select
                    onChange={(e) => setFunctionCine(e.target.value)}
                    value={functionCine}
                  >
                    {funtions.map((e) => {
                      return (
                        <option key={e.id} value={e.horario}>
                          {e.horario}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                {/* TODO: agregar input para setear la cantidad */}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave} disabled={!functionCine}>
                Continuar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </Navbar>
  );
};

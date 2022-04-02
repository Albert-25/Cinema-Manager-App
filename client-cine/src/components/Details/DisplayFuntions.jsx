import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Navbar, Container, Modal, Button, Form } from "react-bootstrap";

export const DisplayFuntions = ({ funtions }) => {
  const [show, setShow] = useState(false);
  const [functionCine, setFunctionCine] = useState();
  const navigate = useNavigate();

  const handleSave = () => {
    const functionSelected = funtions.find((f) => f.horario === functionCine);
    localStorage.setItem("items", JSON.stringify([functionSelected]));
    navigate("/productpage");
  };

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
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </Navbar>
  );
};

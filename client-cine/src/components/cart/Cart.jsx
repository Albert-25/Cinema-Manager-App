import { useEffect, useState } from "react";
import { Offcanvas, Button, Navbar } from "react-bootstrap";

export const Cart = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  return (
    <Navbar  className="justify-content-end" fixed="bottom">
    <Button variant="primary" onClick={handleShow}>
      Launch
    </Button>

    <Offcanvas show={show} onHide={handleClose} placement="end" name="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </Offcanvas.Body>
    </Offcanvas>
  </Navbar>
  )
}


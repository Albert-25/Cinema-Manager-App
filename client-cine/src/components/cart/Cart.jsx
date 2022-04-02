import { useState } from "react";
import { Offcanvas, Button, Navbar } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";

export const Cart = () => {
  // const {user, currentUser } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log("item carrito", itemsCarrito)

  return (
    <Navbar className="justify-content-end" fixed="bottom">
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" name="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <div>{itemsCarrito&&itemsCarrito.map((item) => {
            return(<p>{item.name}</p>)
          })}</div> */}
          <div>{/* <button onClick={handleOnClick}>Reset</button> */}</div>

          <p>Aqui iria mi orgullo, si tubiese alguno</p>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
};

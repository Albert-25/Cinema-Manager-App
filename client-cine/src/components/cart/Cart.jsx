import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Offcanvas, Button, Navbar } from "react-bootstrap";
import { getItemsCart } from "../../utils/itemsCart"

export const Cart = () => {
  const [show, setShow] = useState(false);
  const itemsCart = useSelector((state) => state.itemsCart);
  const total = itemsCart.reduce((pValue, cValue) =>pValue + cValue.quantity*cValue.price, 0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleClick = () => {
    // pagar
    console.log('para stripe',getItemsCart("stripe"))
  }

  return (
    <Navbar className="justify-content-end" fixed="bottom">
      <Button variant="primary" onClick={handleShow}>
        Carrito {itemsCart.length}
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" name="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
            itemsCart.map((item) => {
              return (
                <p key={item.id}>{item.quantity} - {item.name} ${item.price} subTotal:{item.quantity * item.price}</p>
              )
            })
          }
          <p> Total: {total}</p>
        </Offcanvas.Body>
        <Button variant="primary" onClick={handleClick}>Pagar</Button>
      </Offcanvas>
    </Navbar>
  );
};

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Offcanvas, Button, Navbar } from "react-bootstrap";
import { getItemsCart } from "../../utils/itemsCart"
import { updateCart } from "../../store/actions"

export const Cart = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const itemsCart = useSelector((state) => state.itemsCart);
  const total = itemsCart.reduce((pValue, cValue) =>pValue + cValue.quantity*cValue.price, 0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleClick = () => {
    // pagar
    console.log('para stripe',getItemsCart("stripe"))
  }

  const handleDelete = (id, name) => {
    let arrayToSend = itemsCart.filter(i => i.id !== id && i.name !== name)
    localStorage.setItem("items", JSON.stringify(arrayToSend))
    dispatch(updateCart(arrayToSend))
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
              return (<div>
                <p key={item.id}>{item.quantity} - {item.name} ${item.price} subTotal:{item.quantity * item.price}</p>
                <button onClick={() => handleDelete(item.id, item.name)}>delete</button>
              </div>)
            })
          }
          <p> Total: {total}</p>
        </Offcanvas.Body>
        <Button variant="primary" onClick={handleClick}>Pagar</Button>
      </Offcanvas>
    </Navbar>
  );
};

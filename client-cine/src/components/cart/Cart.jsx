import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Offcanvas, Button, Navbar } from "react-bootstrap";
import { updateCart, postBuy } from "../../store/actions"
// import { getItemsCart } from "../../utils/itemsCart"

export const Cart = () => {
  const dispatch = useDispatch();
  const UrlBuy = useSelector((state) => state.cartUrl);
  const [show, setShow] = useState(false);
  const itemsCart = useSelector((state) => state.itemsCart);
  const total = itemsCart.reduce((pValue, cValue) =>pValue + cValue.quantity*cValue.price, 0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleClick = () => {
    alert("done");
    console.log("items card:", itemsCart)
    // console.log("items carrito:", itemsCarrito)
    dispatch(postBuy(itemsCart));
    localStorage.setItem("compra", JSON.stringify(UrlBuy[0]));
  }

  let variable = 1;
  if (UrlBuy && UrlBuy[0] !== undefined && UrlBuy[0].length > 30 && variable === 1) {
      window.location.href = UrlBuy[0]
      console.log('Datos de entrada:', UrlBuy)
      localStorage.setItem('compra', UrlBuy[1])
      variable = variable - 1;
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

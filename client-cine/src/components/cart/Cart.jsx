import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Offcanvas, Button, Navbar, Stack } from "react-bootstrap";
import { BsTrash } from 'react-icons/bs'
import { updateCart, postBuy } from "../../store/actions"
import s from "./cart.module.css"
import logo from "../../assets/cart.png"



export const Cart = () => {
  const dispatch = useDispatch();
  const UrlBuy = useSelector((state) => state.cartUrl);
  const [show, setShow] = useState(false);
  const itemsCart = useSelector((state) => state.itemsCart);
  const total = itemsCart.reduce((pValue, cValue) => pValue + cValue.quantity * cValue.price, 0)

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

//     <>
//       <div className={s.show} onClick={handleShow}>
//         <img src={logo} alt="logo-carrito" className={s.img}/>
//         <span className={s.span}>{itemsCart.length}</span>
//       </div>

    <Navbar style={{ right: "0", left: "auto" }} fixed="bottom">
      <Button variant="primary" onClick={handleShow}>
        Carrito {itemsCart.length}
      </Button>


      <Offcanvas show={show} onHide={handleClose} placement="end" name="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={4}>
            {
              itemsCart.map((item) => {
                return (
                  <div className={s.itemlist} key={item.id}>
                    <span>{item.quantity} - {item.name} $ {item.quantity * item.price}</span>
                    <Button variant="outline-danger" size="sm">
                      <BsTrash onClick={() => handleDelete(item.id, item.name)} />
                    </Button>
                  </div>
                )
              })
            }
          </Stack>
        </Offcanvas.Body>
        <p className={s.total}> Total: <span className={s.total_number}>${total}</span></p>
        <Button variant="primary" onClick={handleClick}>Pagar</Button>
      </Offcanvas>
    </>
  );
};

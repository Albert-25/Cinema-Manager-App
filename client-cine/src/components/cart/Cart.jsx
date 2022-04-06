import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Offcanvas, Button, Stack } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { updateCart, postBuy } from "../../store/actions";
import s from "./cart.module.css";
import logo from "../../assets/cart.png";
import ticket from "../../assets/ticket.png";
import Swal from "sweetalert2";

export const Cart = () => {
  const dispatch = useDispatch();
  const UrlBuy = useSelector((state) => state.cartUrl);
  const [show, setShow] = useState(false);
  const itemsCart = useSelector((state) => state.itemsCart);
  const total = itemsCart.reduce(
    (pValue, cValue) => pValue + cValue.quantity * cValue.price,
    0
  );
console.log("ASDHJKASHDKJLASHJDK",itemsCart)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    var flag = true;
    for (let i = 0; i < itemsCart.length; i++) {
      if (itemsCart[i].quantity <= itemsCart[i].stock) {
        flag = true;
      } else {
        console.log("le pongo false unu");
        flag = false;
        break;
      }
    }

    if (flag === true) {
      dispatch(postBuy(itemsCart));
      localStorage.setItem("compra", JSON.stringify(UrlBuy[0]));
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Uno de tus produtos acaba de ponerse fuera de stock',
        showConfirmButton: false,
        timer: 2000
      })
    }
  };

  let variable = 1;
  if (
    UrlBuy &&
    UrlBuy[0] !== undefined &&
    UrlBuy[0].length > 30 &&
    variable === 1
  ) {
    window.location.href = UrlBuy[0];
    localStorage.setItem("compra", UrlBuy[1]);
    variable = variable - 1;
  }

  const handleDelete = (id, name) => {
    let arrayToSend = itemsCart.filter((i) => i.id !== id && i.name !== name);
    localStorage.setItem("items", JSON.stringify(arrayToSend));
    dispatch(updateCart(arrayToSend));
  };

  return (
    <>
      <div className={s.show} onClick={handleShow}>
        <img src={logo} alt="logo-carrito" className={s.img} />
        <span className={s.span}>{itemsCart.length}</span>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end" name="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={4}>
            {itemsCart.map((item) => {
              return (
                <div className={s.itemlist} key={item.id}>
                  <span className={s.imgticket}>
                    <img
                      src={item.imagenProducto ? item.imagenProducto : ticket}
                      width="75px"
                      height="50px"
                    />
                  </span>
                  <span className={s.texto}>
                    {item.quantity}
                    {" und."} - {item.name} $ {item.quantity * item.price}
                  </span>
                  <span className={s.buttonTrash}>
                    <Button
                      onClick={() => handleDelete(item.id, item.name)}
                      variant="outline-danger"
                      size="sm"
                    >
                      <BsTrash />
                    </Button>
                  </span>
                </div>
              );
            })}
          </Stack>
        </Offcanvas.Body>
        <p className={s.total}>
          {" "}
          Total: <span className={s.total_number}>${total}</span>
        </p>
        <Button variant="primary" onClick={handleClick}>
          Pagar
        </Button>
      </Offcanvas>
    </>
  );
};

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { Spinner, Card, Button } from "react-bootstrap";
import s from "./checksale.module.css"
import axios from "axios"
import { toString } from "../../utils/toString";

const { REACT_APP_BASE_URL } = process.env;

export const CheckSale = () => {
  const uuid = useParams().uuid;
  const [order, setOrder] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${REACT_APP_BASE_URL}/compras/${uuid}`)
      .then(res => {
        setOrder(res.data)
      })
      .catch(err => console.error(err.data))
  }, [uuid])

  const handleClick = async () => {
    if (order.verificado) {
      return navigate('/admin')
    }
    const body = {
      compra: {
        verificado: true
      }
    }
    try {
      const res = await axios.put(`${REACT_APP_BASE_URL}/compras/${uuid}`, body)
      if (res.status === 200) navigate('/admin')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={s.container}>
      {!order && <Spinner animation="border" size="xxl" />}
      {order && <Card>
        <Card.Header>Compra realizada por {order.Nombre}</Card.Header>
        <Card.Body>
          <Card.Title>Productos: {toString(order.products)}</Card.Title>
          <Card.Text>Total: $ {order.total}</Card.Text>
          {order.verificado ? <Card.Text>Ya fue verificada</Card.Text> : null}
          <Button variant="primary" onClick={handleClick}>
            {order.verificado ? 'Ver historial' : 'Verificar'}
          </Button>
        </Card.Body>
      </Card>
      }
    </div>
  )
}
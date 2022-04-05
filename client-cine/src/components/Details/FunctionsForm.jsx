import { Form } from "react-bootstrap";

export const FunctionsForm = ({ handleChange, horario, funtions, asientos, quantity }) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Horario</Form.Label>
        <Form.Select
          onChange={handleChange}
          value={horario}
          name="horario"
        >
          <option value="default">Seleccione un horario</option>
          {funtions.map((e) => {
            return (
              <option key={e.id} value={e.horario}>
                {e.horario}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
      {horario && <Form.Group className="mb-3">
        <Form.Label htmlFor="inputStok">{`Cantidad disponible (${asientos})`}</Form.Label>
        <Form.Control
          type="number"
          id="inputStok"
          min="1"
          max={asientos}
          value={quantity}
          name="quantity"
          onChange={handleChange}
        />
      </Form.Group>}
    </Form>
  )
}
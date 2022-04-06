import { Modal, Button} from "react-bootstrap";

export const ModalContainer = ({ show, children, handleClose, handleContinue, disabled }) => {
  return (
    <Modal show={show} fullscreen="xl-down">
      <Modal.Body>
        {children}
      </Modal.Body>
      <ModalFooter
        handleClose={handleClose}
        handleContinue={handleContinue}
        disabled={disabled}
      />
    </Modal>
  )
}

const ModalFooter = ({ handleClose, handleContinue, disabled }) => {
  return (
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleContinue} disabled={disabled}>
        Continue
      </Button>
    </Modal.Footer>
  )
}
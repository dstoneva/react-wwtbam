import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const EndGameModal = ({ showModal, gameOutcome, currentPrize, newGame }) => {
  const displayMessage = gameOutcome === "loss" ? "Game Over" : "Congratulations!";
  const bodyMessage = gameOutcome === "loss" ? `Game Over! You win ${currentPrize}.` : "You're now a Millionaire!";

  return (
    <Modal isOpen={showModal}>
      <ModalHeader>{displayMessage}</ModalHeader>
      <ModalBody>{bodyMessage}</ModalBody>
      <ModalFooter>
        <Button color="success" onClick={newGame}>
          Play again?
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EndGameModal;

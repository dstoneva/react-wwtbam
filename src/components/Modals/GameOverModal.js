import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import React from "react";

const GameOverModal = ({ currentPrize, gameOver, newGame }) => {
  return (
    <Modal isOpen={gameOver}>
      <ModalHeader>Game over</ModalHeader>
      <ModalBody>{`Game Over! You win ${currentPrize}.`}</ModalBody>
      <ModalFooter>
        <Button color="success" onClick={newGame}>
          Play again?
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default GameOverModal;

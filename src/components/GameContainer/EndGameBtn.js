import React from "react";
import { Button } from "reactstrap";
import { modalData, prizesList } from "../../constants/Constants";

const EndGameBtn = ({ setModalContent, questionNumber, newGame }) => {
  const handleClick = () => {
    setModalContent({
      ...modalData.exitGame,
      body: `Game over! You win ${prizesList[questionNumber - 1].amount}.`,
      action: newGame
    });
  };
  return (
    <Button color="danger" style={{ marginRight: "1.5rem" }} onClick={handleClick}>
      End Game
    </Button>
  );
};

export default EndGameBtn;

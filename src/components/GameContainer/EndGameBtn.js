import React from "react";
import { Button } from "reactstrap";

const EndGameBtn = ({ setShowModal, setGameOutcome }) => {
  const handleClick = () => {
    setGameOutcome("loss");
    setShowModal(true);
  };
  return <Button color="danger" style={{ marginRight:"1.5rem"}} onClick={handleClick}>End Game</Button>;
};

export default EndGameBtn;

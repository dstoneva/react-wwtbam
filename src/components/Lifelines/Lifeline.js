import React from "react";
import { Button } from "reactstrap";

const Lifeline = ({ used, setUsed, name }) => {
  const handleClick = () => {
    setUsed(true);
  };
  return (
    <Button onClick={handleClick} disabled={used}>
      {name}
    </Button>
  );
};

export default Lifeline;

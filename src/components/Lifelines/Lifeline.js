import React, { useState } from "react";
import { Button } from "reactstrap";

const Lifeline = ({ setUsed, name }) => {
  const [disabled, setDisabled] = useState(false);
  const handleClick = () => {
    setUsed(true);
    setDisabled(true);
  };

  return (
    <Button onClick={handleClick} disabled={disabled} color={disabled ? "danger" : "warning"}>
      {name}
    </Button>
  );
};

export default Lifeline;

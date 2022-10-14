import { prizesList } from "../../constants/Constants";
import classes from "./PrizesList.module.css";

import React from "react";
import { Button } from "reactstrap";

const PrizesList = ({ questionNumber }) => {
  return (
    <div className={classes["prizes-list"]}>
      {prizesList.map(({ id, amount }) => {
        return (
          <>
            <Button
              style={{ color: "white", cursor: "default", border: "none" }}
              key={id}
              className={questionNumber + 1 === id ? classes["prizes-list-item-active"] : classes["prizes-list-item"]}
              color={id === 5 || id === 10 || id === 15 ? "danger" : ""}
              disabled={questionNumber + 1 > id ? true : false}
            >
              <span className={classes["prizes-list-number"]}>{id}</span>
              <span className={classes["prizes-list-amount"]}>{amount}</span>
            </Button>
          </>
        );
      })}
    </div>
  );
};

export default PrizesList;

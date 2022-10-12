import { prizesList } from "../../constants/Constants";
import classes from "./PrizesList.module.css";

import React from "react";

const PrizesList = ({ questionNumber }) => {
  console.log();
  return (
    <ul className={classes["prizes-list"]}>
      {prizesList.map(({ id, amount }) => {
        return (
          <>
            <li
              key={id}
              className={questionNumber + 1 === id ? classes["prizes-list-item-active"] : classes["prizes-list-item"]}
            >
              <span className={classes["prizes-list-number"]}>{id}</span>
              <span className={classes["prizes-list-amount"]}>{amount}</span>
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default PrizesList;

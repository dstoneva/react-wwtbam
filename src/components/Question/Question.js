import React from "react";
import classes from "./Question.module.css";

const Question = ({ question }) => {
  return (
    <div className={classes["quiz"]}>
      <div className={classes["question"]}>{decodeURIComponent(question)}</div>
    </div>
  );
};

export default Question;

import React from "react";
import classes from "./QuizWrapper.module.css";

const QuizWrapper = ({ children }) => {
  return <div className={classes["quiz-wrapper"]}>{children}</div>;
};

export default QuizWrapper;

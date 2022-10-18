import React, { useEffect, useState } from "react";
import classes from "./Answers.module.css";

const Answer = ({ letter, correctAnswer, answer, setSelectedAnswer, selectedAnswer, handleClick }) => {
  const [className, setClassName] = useState(`${classes["answer"]}`);

  useEffect(() => {
    setClassName(`${classes["answer"]}`);
  }, [answer]);

  useEffect(() => {
    setTimeout(() => {
      if (selectedAnswer && answer === correctAnswer) {
        setClassName(`${classes["answer-correct"]}`);
      }
    }, 2500);
  }, [selectedAnswer, answer, correctAnswer]);

  const answerClicked = () => {
    setSelectedAnswer(answer);
    setClassName(`${classes["answer-selected"]}`);
    setTimeout(() => {
      if (answer !== correctAnswer) {
        setClassName(`${classes["answer-incorrect"]}`);
      }
      setTimeout(() => {
        handleClick(answer);
      }, 1000);
    }, 2000);
  };

  return (
    <button disabled={selectedAnswer || answer === ""} className={className} onClick={() => answerClicked(answer)}>
      <span>{letter}</span> {decodeURIComponent(answer)}
    </button>
  );
};

export default Answer;

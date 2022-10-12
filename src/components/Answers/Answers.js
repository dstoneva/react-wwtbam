import React, { useState } from "react";
import classes from "./Answers.module.css";
import { abcd } from "../../constants/Constants";
import Answer from "./Answer";

const Answers = ({ answers, correctAnswer, setGameOver, setQuestionNumber, questionNumber }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer && questionNumber < 14) {
      setQuestionNumber((prevState) => prevState + 1);
      setSelectedAnswer("");
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className={classes["answers"]}>
      {answers.map((answer, index) => {
        return (
          <Answer
            key={index}
            letter={abcd[index]}
            answer={answer}
            handleClick={handleClick}
            correctAnswer={correctAnswer}
            setSelectedAnswer={setSelectedAnswer}
            selectedAnswer={selectedAnswer}
          />
        );
      })}
    </div>
  );
};

export default Answers;

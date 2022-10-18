import React, { useState } from "react";
import classes from "./Answers.module.css";
import { abcd } from "../../constants/Constants";
import Answer from "./Answer";
import { modalData } from "../../constants/Constants";

const Answers = ({ answers, correctAnswer, gameStateProps }) => {
  const { questionNumber, setQuestionNumber, setCurrentPrize, currentPrize, setModalContent, newGame } = gameStateProps;

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const HandleClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer && questionNumber < 14) {
      setQuestionNumber((prevState) => prevState + 1);
      if (questionNumber >= 4 && questionNumber < 9) {
        setCurrentPrize("$ 5000");
      }
      if (questionNumber >= 9 && questionNumber <= 13) {
        setCurrentPrize("$ 30 000");
      }
      setSelectedAnswer(null);
    } else if (answer === correctAnswer && questionNumber === 14) {
      setModalContent({
        ...modalData.winGame,
        body: "Congratulations! You're now a Millionaire!",
        action: newGame
      });
    } else {
      setModalContent({
        ...modalData.gameOver,
        body: `Game over! You win ${currentPrize}.`,
        action: newGame
      });
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
            handleClick={HandleClick}
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

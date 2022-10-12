import React, { useState } from "react";
import classes from "./Answers.module.css";
import { abcd } from "../../constants/Constants";
import Answer from "./Answer";
import { Button } from "reactstrap";

const Answers = ({ answers, correctAnswer, gamestateProps }) => {
  const { questionNumber, setQuestionNumber, setGameOver, newGame, currentPrize, setModalContent, setShowModal } =
    gamestateProps;

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer && questionNumber < 14) {
      setQuestionNumber((prevState) => prevState + 1);
      setSelectedAnswer("");
    } else {
      setModalContent(gameOverModal);
      setShowModal(true);
      setGameOver(true);
    }
  };

  const gameOverModal = () => {
    return {
      header: "Game Over",
      body: `Game Over! You win ${currentPrize}.`,
      footer: (
        <Button color="success" onClick={newGame}>
          Play again?
        </Button>
      )
    };
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

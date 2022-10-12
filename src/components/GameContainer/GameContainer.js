import React, { useState, useEffect } from "react";
import classes from "./GameContainer.module.css";
import getQuestions from "../../data/opentdbApi";
import PrizesList from "../PrizesList/PrizesList";
import QuizWrapper from "../Quiz/QuizWrapper";
import Quiz from "../Quiz/Quiz";
import GameOverModal from "../Modals/GameOverModal";
import { Spinner } from "reactstrap";
import GlobalModal from "../Modals/GlobalModal";

const GameContainer = () => {
  const [questionsData, setQuestionsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPrize, setCurrentPrize] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [askTheAudienceUsed, setAskTheAudienceUsed] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [askAfriendUsed, setAskAfriendUsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const generateQuestions = async () => {
    try {
      setLoading(true);
      const data = await getQuestions("easy");
      setQuestionsData(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    generateQuestions();
  }, []);

  const newGame = (e) => {
    e.preventDefault();
    generateQuestions();
    setQuestionsData(null);
    setQuestionNumber(0);
    setGameOver(false);
    setAnswers([]);
    setCurrentPrize(0);
    setFiftyFiftyUsed(false);
    setAskTheAudienceUsed(false);
    setAskAfriendUsed(false);
    setShowModal(false);
  };

  const lifelineProps = {
    fiftyFiftyUsed,
    setFiftyFiftyUsed,
    askTheAudienceUsed,
    setAskTheAudienceUsed,
    askAfriendUsed,
    setAskAfriendUsed
  };

  const gamestateProps = {
    questionNumber,
    setQuestionNumber,
    questionsData,
    showModal,
    setShowModal,
    modalContent,
    setModalContent,
    gameOver,
    setGameOver,
    currentPrize,
    setCurrentPrize,
    newGame
  };

  const questionProps = {
    answers,
    setAnswers,
    incorrectAnswers,
    setIncorrectAnswers
  };
  console.log(lifelineProps);

  return (
    <div className={classes["app-container"]}>
      {modalContent && <GlobalModal showModal={showModal} content={modalContent} />}
      <QuizWrapper>
        {loading ? (
          <Spinner
            style={{
              marginBottom: "6rem",
              height: "3rem",
              width: "3rem"
            }}
          />
        ) : (
          <>
            {questionsData !== null ? (
              <Quiz gamestateProps={gamestateProps} questionProps={questionProps} lifelineProps={lifelineProps} />
            ) : null}
          </>
        )}
      </QuizWrapper>
      <PrizesList questionNumber={questionNumber} />
    </div>
  );
};

export default GameContainer;

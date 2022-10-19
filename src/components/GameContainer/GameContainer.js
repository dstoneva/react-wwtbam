import React, { useState, useEffect } from "react";
import classes from "./GameContainer.module.css";
import getQuestions from "../../data/opentdbApi";
import PrizesList from "../PrizesList/PrizesList";
import QuizWrapper from "../Quiz/QuizWrapper";
import Quiz from "../Quiz/Quiz";
import { Spinner } from "reactstrap";
import GlobalModal from "../Modals/GlobalModal";
import EndGameBtn from "./EndGameBtn";

const GameContainer = () => {
  const [questionsData, setQuestionsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPrize, setCurrentPrize] = useState("$0");
  const [answers, setAnswers] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [askTheAudienceUsed, setAskTheAudienceUsed] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [askAfriendUsed, setAskAfriendUsed] = useState(false);
  const [modalContent, setModalContent] = useState({});

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

  const newGame = () => {
    setModalContent({});
    generateQuestions();
    setQuestionNumber(0);
    setAnswers([]);
    setCurrentPrize("$0");
    setFiftyFiftyUsed(false);
    setAskTheAudienceUsed(false);
    setAskAfriendUsed(false);
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
    setCurrentPrize,
    setModalContent,
    newGame,
    currentPrize
  };

  const questionProps = {
    answers,
    setAnswers,
    incorrectAnswers,
    setIncorrectAnswers
  };

  return (
    <div className={classes["app-container"]}>
      <GlobalModal
        currentPrize={currentPrize}
        newGame={newGame}
        modalContent={modalContent}
        incorrectAnswers={incorrectAnswers}
      />
      <QuizWrapper>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {questionsData !== null ? (
              <>
                <EndGameBtn setModalContent={setModalContent} questionNumber={questionNumber} newGame={newGame}>
                  End game
                </EndGameBtn>
                <Quiz gameStateProps={gamestateProps} questionProps={questionProps} lifelineProps={lifelineProps} />
              </>
            ) : null}
          </>
        )}
      </QuizWrapper>
      <PrizesList questionNumber={questionNumber} />
    </div>
  );
};

export default GameContainer;

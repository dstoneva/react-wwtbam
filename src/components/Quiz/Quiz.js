import React, { useEffect } from "react";
import Question from "../Question/Question";
import Answers from "../Answers/Answers";
import { pickRandomElement } from "../../helpers/Helpers";
import { prizesList } from "../../constants/Constants";
import AskTheAudience from "../Modals/AskTheAudience";
import Header from "../Header/Header";

const Quiz = ({
  questions,
  answers,
  setAnswers,
  incorrectAnswers,
  setIncorrectAnswers,
  questionNumber,
  setQuestionNumber,
  setGameOver,
  setCurrentPrize,
  lifelineProps
}) => {
  const {
    fiftyFiftyUsed,
    setFiftyFiftyUsed,
    setAskAfriendUsed,
    askAfriendUsed,
    setAskTheAudienceUsed,
    askTheAudienceUsed
  } = lifelineProps;
  
  const correctAnswer = questions[questionNumber].correct_answer;
  let currentIncorrectAnswers = questions[questionNumber].incorrect_answers;
  const currentQuestion = questions[questionNumber].question;
  let currentQuestionAnswers = currentIncorrectAnswers.concat(correctAnswer).sort();

  useEffect(() => {
    if (fiftyFiftyUsed) {
      let remainingIncorrectAnswer = pickRandomElement(currentIncorrectAnswers);
      currentQuestionAnswers = currentQuestionAnswers.map((answer) => {
        if (answer !== remainingIncorrectAnswer && answer !== correctAnswer) {
          return " ";
        }
        return answer;
      });
      currentIncorrectAnswers = incorrectAnswers.map((answer) => {
        if (answer !== remainingIncorrectAnswer) {
          return " ";
        }
        return answer;
      });
      setAnswers(currentQuestionAnswers);
      setIncorrectAnswers(currentIncorrectAnswers);
    }
  }, [fiftyFiftyUsed]);

  useEffect(() => {
    setIncorrectAnswers(currentIncorrectAnswers);
    setAnswers(currentQuestionAnswers);
    setCurrentPrize(questionNumber !== 0 ? prizesList[questionNumber - 1].amount : "$ 0");
  }, [questionNumber]);

  return (
    <>
      <Header
        setFiftyFiftyUsed={setFiftyFiftyUsed}
        setAskTheAudienceUsed={setAskTheAudienceUsed}
        fiftyFifyUsed={fiftyFiftyUsed}
        askTheAudienceUsed={askTheAudienceUsed}
        askAfriendUsed={askAfriendUsed}
        setAskAfriendUsed={setAskAfriendUsed}
      />
      {askTheAudienceUsed && (
        <AskTheAudience
          correctAnswer={correctAnswer}
          answers={answers}
          askTheAudienceUsed={askTheAudienceUsed}
          setAskTheAudienceUsed={setAskTheAudienceUsed}
          incorrectAnswers={incorrectAnswers}
          fiftyFiftyUsed={fiftyFiftyUsed}
        />
      )}
      <Question question={currentQuestion}></Question>
      <Answers
        answers={answers}
        correctAnswer={correctAnswer}
        setGameOver={setGameOver}
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
      />
    </>
  );
};

export default Quiz;

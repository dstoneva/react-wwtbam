import React, { useEffect } from "react";
import Question from "../Question/Question";
import Answers from "../Answers/Answers";
import { pickRandomElement } from "../../helpers/Helpers";
import AskTheAudience from "../Modals/AskTheAudience";
import Header from "../Header/Header";
import CallFriend from "../Modals/CallFriend";
import { Button } from "reactstrap";

const Quiz = ({ gameStateProps, lifelineProps, questionProps }) => {
  const { fiftyFiftyUsed, setAskTheAudienceUsed, askTheAudienceUsed, askAfriendUsed, setAskAfriendUsed } = lifelineProps;

  const { answers, setAnswers, incorrectAnswers, setIncorrectAnswers } = questionProps;

  const { questionNumber, questionsData } = gameStateProps;

  const correctAnswer = questionsData[questionNumber].correct_answer;
  let currentIncorrectAnswers = questionsData[questionNumber].incorrect_answers;
  const currentQuestion = questionsData[questionNumber].question;
  let currentQuestionAnswers = currentIncorrectAnswers.concat(correctAnswer).sort();

  useEffect(() => {
    if (fiftyFiftyUsed) {
      let remainingIncorrectAnswer = pickRandomElement(currentIncorrectAnswers);
      currentQuestionAnswers = currentQuestionAnswers.map((answer) => {
        if (answer !== remainingIncorrectAnswer && answer !== correctAnswer) {
          return "";
        }
        return answer;
      });
      currentIncorrectAnswers = incorrectAnswers.map((answer) => {
        if (answer !== remainingIncorrectAnswer) {
          return "";
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
  }, [questionNumber]);

  return (
    <>
      {askAfriendUsed && (
        <CallFriend
          setAskAfriendUsed={setAskAfriendUsed}
          askAfriendUsed={askAfriendUsed}
          correctAnswer={correctAnswer}
          incorrectAnswers={incorrectAnswers}
        />
      )}
      {askTheAudienceUsed && (
        <AskTheAudience
          correctAnswer={correctAnswer}
          answers={answers}
          incorrectAnswers={incorrectAnswers}
          setAskTheAudienceUsed={setAskTheAudienceUsed}
          askTheAudienceUsed={askTheAudienceUsed}
        />
      )}
      <Header lifelineProps={lifelineProps} />
      <Question question={currentQuestion} />
      <Answers gameStateProps={gameStateProps} answers={answers} correctAnswer={correctAnswer} />
    </>
  );
};

export default Quiz;

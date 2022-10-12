import React, { useEffect } from "react";
import Question from "../Question/Question";
import Answers from "../Answers/Answers";
import { pickRandomElement } from "../../helpers/Helpers";
import { prizesList } from "../../constants/Constants";
import AskTheAudience from "../Modals/AskTheAudience";
import Header from "../Header/Header";

const Quiz = ({ gamestateProps, lifelineProps, questionProps }) => {
  console.log(gamestateProps);
  const { fiftyFiftyUsed, setAskTheAudienceUsed, askTheAudienceUsed } = lifelineProps;

  const { answers, setAnswers, incorrectAnswers, setIncorrectAnswers } = questionProps;

  const { questionNumber, questionsData, setCurrentPrize } = gamestateProps;

  const correctAnswer = questionsData[questionNumber].correct_answer;
  let currentIncorrectAnswers = questionsData[questionNumber].incorrect_answers;
  const currentQuestion = questionsData[questionNumber].question;
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
      <Header lifelineProps={lifelineProps} />
      {askTheAudienceUsed && (
        <AskTheAudience
          correctAnswer={correctAnswer}
          answers={answers}
          askTheAudienceUsed={askTheAudienceUsed}
          setAskTheAudienceUsed={setAskTheAudienceUsed}
          incorrectAnswers={incorrectAnswers}
        />
      )}
      <Question question={currentQuestion}></Question>
      <Answers gamestateProps={gamestateProps} answers={answers} correctAnswer={correctAnswer} />
    </>
  );
};

export default Quiz;

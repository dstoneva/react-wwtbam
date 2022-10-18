import React, { useEffect } from "react";
import Question from "../Question/Question";
import Answers from "../Answers/Answers";
import { pickRandomElement, getRandomIntBetweenValues, addToCertainValue } from "../../helpers/Helpers";
import Header from "../Header/Header";
import { modalData } from "../../constants/Constants";

const Quiz = ({ gameStateProps, lifelineProps, questionProps }) => {
  const { fiftyFiftyUsed, askTheAudienceUsed, askAfriendUsed } = lifelineProps;

  const { answers, setAnswers, incorrectAnswers, setIncorrectAnswers } = questionProps;

  const { questionNumber, questionsData, setModalContent } = gameStateProps;

  const correctAnswer = questionsData[questionNumber].correct_answer;
  let currentIncorrectAnswers = questionsData[questionNumber].incorrect_answers;
  const currentQuestion = questionsData[questionNumber].question;
  let currentQuestionAnswers = currentIncorrectAnswers.concat(correctAnswer).sort();

  const toggleModal = () =>
    setModalContent((previousState) => {
      return { ...previousState, showModal: false };
    });

  //50-50 hint:
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

  //Ask a friend hint:
  useEffect(() => {
    let friendsAnswer = "";
    if (askAfriendUsed) {
      let coefficient = getRandomIntBetweenValues(1, 10);

      if (coefficient > 3) {
        friendsAnswer = "Hello, friend, I'm sure the correct answer is " + decodeURIComponent(correctAnswer); //70%
      }
      if (coefficient === 3) {
        friendsAnswer = "Hello, friend, I'm sorry, but I don't know the answer."; //10%
      }
      if (coefficient <= 2) {
        let pickedIncorrectAnswer = pickRandomElement(incorrectAnswers);
        if (pickedIncorrectAnswer === "") {
          pickedIncorrectAnswer = incorrectAnswers.filter((incorrectAnswer) => incorrectAnswer !== "");
        }
        friendsAnswer =
          "Hello, friend, I don't know the answer, but I would say " + decodeURIComponent(pickedIncorrectAnswer); //20%
      }

      setModalContent({ ...modalData.callAFriend, body: friendsAnswer, action: toggleModal });
    }
  }, [askAfriendUsed]);

  //Ask the audience hint:
  useEffect(() => {
    if (askTheAudienceUsed) {
      const answersPercentage = {};
      const correctAnswerPercent = getRandomIntBetweenValues(60, 50);
      answersPercentage[correctAnswer] = correctAnswerPercent;
      let maxCount = incorrectAnswers.includes("") ? 1 : 3;
    
      const incorrectAnswersPercentage = addToCertainValue(100 - correctAnswerPercent, maxCount);
      incorrectAnswers.forEach((incorrectAnswer, index) => {
        if (maxCount !== 1) {
          answersPercentage[incorrectAnswer] = incorrectAnswersPercentage[index];
        } else {
          answersPercentage[incorrectAnswer] = incorrectAnswersPercentage[0];
        }
      });
      setModalContent({
        ...modalData.askTheAudience,
        body: answers,
        action: toggleModal,
        answersPercentage: answersPercentage
      });
    }
  }, [askTheAudienceUsed]);

  useEffect(() => {
    setIncorrectAnswers(currentIncorrectAnswers);
    setAnswers(currentQuestionAnswers);
  }, [questionNumber]);

  return (
    <>
      <Header lifelineProps={lifelineProps} />
      <Question question={currentQuestion} />
      <Answers gameStateProps={gameStateProps} answers={answers} correctAnswer={correctAnswer} />
    </>
  );
};

export default Quiz;

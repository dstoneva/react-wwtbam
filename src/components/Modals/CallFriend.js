import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getRandomIntBetweenValues, pickRandomElement } from "../../helpers/Helpers";

const CallFriend = ({ setAskAfriendUsed, askAfriendUsed, correctAnswer, incorrectAnswers }) => {
  let friendsAnswer = "";

  let coefficient = getRandomIntBetweenValues(1, 10);
  const handleClose = () => {
    setAskAfriendUsed(false);
  };

  if (coefficient > 3) { //70%
    friendsAnswer = "Hello, friend, I'm sure the correct answer is " + decodeURIComponent(correctAnswer);
  }
  if (coefficient === 3) { //10%
    friendsAnswer = "Hello, friend, I'm sorry, but I don't know the answer.";
  }
  if (coefficient <= 2) { //20%
    let pickedIncorrectAnswer = pickRandomElement(incorrectAnswers);
    if (pickedIncorrectAnswer === "") {
      pickedIncorrectAnswer = incorrectAnswers.filter((incorrectAnswer) => incorrectAnswer !== "");
    }
    friendsAnswer = "Hello, friend, I don't know the answer, but I would say " + decodeURIComponent(pickedIncorrectAnswer);
  }

  return (
    <Modal isOpen={askAfriendUsed} toggle={handleClose}>
      <ModalHeader>Call a friend</ModalHeader>
      <ModalBody>{friendsAnswer}</ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default CallFriend;

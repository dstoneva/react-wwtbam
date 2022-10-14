import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress } from "reactstrap";
import { getRandomIntBetweenValues, addToCertainValue } from "../../helpers/Helpers";

const AskTheAudience = ({ answers, correctAnswer, incorrectAnswers, askTheAudienceUsed, setAskTheAudienceUsed }) => {
  
  const variants = ["success", "info", "warning", "danger"];
  const answersPercentage = {};
  const correctAnswerPercent = getRandomIntBetweenValues(60, 50);
  answersPercentage[correctAnswer] = correctAnswerPercent;
  let maxCount = incorrectAnswers.includes("") ? 1 : 3;

  const handleClose = () => {
    setAskTheAudienceUsed(false);
  };

  const incorrectAnswersPercentage = addToCertainValue(100 - correctAnswerPercent, maxCount);
  incorrectAnswers.forEach((incorrectAnswer, index) => {
    if (maxCount !== 1) {
      answersPercentage[incorrectAnswer] = incorrectAnswersPercentage[index];
    } else {
      answersPercentage[incorrectAnswer] = incorrectAnswersPercentage[0];
    }
  });

  return (
    <Modal isOpen={askTheAudienceUsed} style={{ width: "28rem", color: "black", height: "20rem" }} toggle={handleClose}>
      <ModalHeader style={{ fontSize: "1rem" }}>Ask the audience</ModalHeader>
      <ModalBody>
        {answers.map((answer, index) => {
          if (answer !== "") {
            return (
              <>
                <div key={index} style={{ padding: "5px" }} className="text-left">
                  {decodeURIComponent(answer)}: {answersPercentage[answer]} %
                </div>
                <Progress
                  key={Date.now()}
                  animated={true}
                  value={answersPercentage[answer]}
                  color={variants[index]}
                  max={100}
                />
              </>
            );
          }
        })}
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AskTheAudience;

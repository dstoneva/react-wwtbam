import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "reactstrap";
import { getRandomIntBetweenValues, addToCertainValue } from "../../helpers/Helpers";

const GlobalModal = ({ incorrectAnswers, modalContent }) => {
  const variants = ["success", "info", "warning", "danger"];

  return (
    <Modal isOpen={modalContent.showModal}>
      <ModalHeader>{modalContent.title}</ModalHeader>
      <ModalBody>
        {Array.isArray(modalContent.body) ? (
          modalContent.body.map((answer, index) => {
            if (answer !== "") {
              return (
                <>
                  <div key={index} style={{ padding: "5px" }} className="text-left">
                    {decodeURIComponent(answer)}: {modalContent.answersPercentage[answer]} %
                  </div>
                  <Progress
                    key={Date.now()}
                    animated={true}
                    value={modalContent.answersPercentage[answer]}
                    color={variants[index]}
                    max={100}
                  />
                </>
              );
            }
          })
        ) : (
          <div>{modalContent.body}</div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={modalContent.action}>
          {modalContent.buttonText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default GlobalModal;

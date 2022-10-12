import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const GlobalModal = ({ content, showModal }) => {
  let { header, body, footer, style } = content;
  return (
    <Modal isOpen={showModal} style={style}>
      {header && <ModalHeader>{header}</ModalHeader>}
      {body && <ModalBody>{body}</ModalBody>}
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  );
};

export default GlobalModal;

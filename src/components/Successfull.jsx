import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Successfull({ isOpen, toggle }) {
  const _closeModal = () => {
    toggle();
  };

  const clickOnSubmitBtn = () => {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?tab=1";
    window.location.href = newurl;
    toggle();
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalBody>
          <div style={{ textAlign: "center" }}>
            <img src="../../check (1).png" alt="" width="20%" />
          </div>
          <div>
            <h1 style={{ textAlign: "center", marginTop: "5%" }}>
              Booking Confirmed
            </h1>
          </div>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Button color="primary" onClick={clickOnSubmitBtn}>
              Ok
            </Button>{" "}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Successfull;

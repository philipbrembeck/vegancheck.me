import React, { useState } from "react";

const Modal = ({ id, children, buttonType, buttonClass, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {buttonType === "sup" && (
        <sup
          data-target={id}
          data-toggle="modal"
          className={buttonClass}
          onClick={openModal}
        >
          {buttonText}
        </sup>
      )}
      {buttonType === "span" && (
        <span
          data-target={id}
          data-toggle="modal"
          className={buttonClass}
          onClick={openModal}
        >
          {buttonText}
        </span>
      )}
      {buttonType === "div" && (
        <div
          data-target={id}
          data-toggle="modal"
          className={buttonClass}
          onClick={openModal}
        >
          {buttonText}
        </div>
      )}
      {isOpen && (
        <div className="modal_view animated fadeInUp open">
          <div className="modal_close">
            <a
              className="btn-dark"
              data-dismiss="modal"
              onClick={() => {
                document.querySelector(".modal_view").classList.add("fadeOutDown");
                setTimeout(() => {
                    setIsOpen(false);
                }, 500);
              }}
            >
              ×
            </a>
          </div>
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;
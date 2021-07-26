import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdrop}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

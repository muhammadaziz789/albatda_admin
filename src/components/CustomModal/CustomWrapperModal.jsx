import { Card, Modal } from "@mui/material";
import { cloneElement, useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import styles from "./style.module.scss";

const CustomWrapperModal = ({ children, onClick, id,title }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const closeModal = () => setModalIsVisible(false);
  const openModal = () => setModalIsVisible(true);

  return (
    <>
      <Modal
        open={modalIsVisible}
        disableAutoFocus
        className={styles.modal}
        onClose={closeModal}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className={styles.card}>
          <div className={styles.body}>{title}</div>

          <div className={styles.footer}>
            <SecondaryButton className={styles.button} onClick={closeModal}>
              Отменить
            </SecondaryButton>

            <PrimaryButton
              className={styles.button}
              // color="warning"
              onClick={() => {
                onClick(id);
                closeModal();
              }}
            >
              Да
            </PrimaryButton>
          </div>
        </Card>
      </Modal>
      {cloneElement(children, { onClick: openModal })}
      {/* {children} */}
    </>
  );
};

export default CustomWrapperModal;

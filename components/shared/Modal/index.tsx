import { PropsWithChildren } from "react";

import styles from "./Modal.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import classNames from "classnames";
import { createPortal } from "react-dom";

const modalRoot = typeof window != "undefined" && document.querySelector("body");

interface Props {
  isOpen: boolean;
  toggle: (state: boolean) => void;
}

const Modal = ({ isOpen, children }: PropsWithChildren<Props>) => {
  return modalRoot ? (
    createPortal(<div className={classNames(styles.Modal, { [styles.Open]: isOpen })}>{children}</div>, modalRoot)
  ) : (
    <div className={classNames(styles.Modal, { [styles.Open]: isOpen })}>{children}</div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;

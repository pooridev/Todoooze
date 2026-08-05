"use client";
import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./Modal.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";

interface Props {
  isOpen: boolean;
  /** Called when the user dismisses the modal via Escape or the backdrop. */
  onClose?: () => void;
}

const Modal = ({ isOpen, onClose, children }: PropsWithChildren<Props>) => {
  useEffect(() => {
    if (!isOpen || !onClose) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.Backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose?.();
          }}
        >
          <motion.div
            className={styles.Modal}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Portal into <body> so the modal escapes any stacking/overflow context.
  return typeof window !== "undefined" ? createPortal(content, document.body) : content;
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;

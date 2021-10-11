import { ReactChild, useRef } from 'react';

import styles from './Modal.module.css';
import useOutsideClickHandler from './../../hooks/useOutsideClickHandler';
import { useModal } from '../../providers/Modal';
import { Mode } from 'fs';

/**
 *
 * A modal component that renders the children
 * between the opening and closing tags.
 *
 * Hooks:
 * - useModal: use to open and close the modal.
 */

interface IProps {
  children: ReactChild | ReactChild[];
  isOpen: boolean;
}

const Modal = (props: IProps) => {

  const { isOpen, children } = props;

  const cssClasses = [styles.Modal];

  if (isOpen) cssClasses.push(styles.Open);

  return (
    <div className={cssClasses.join(' ')}>
      {/* the content of the modal */}
      {children}
    </div>
  );
};

export default Modal;

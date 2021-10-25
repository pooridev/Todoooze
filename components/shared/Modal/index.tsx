import { ReactChild } from 'react';

import styles from './Modal.module.css';
import Header from './Header';
import Footer from './Footer';

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
  onSubmit: () => void;
  projectName: string;
  isOpen: boolean;
}

const Modal = (props: IProps) => {
  const { isOpen, children, projectName, onSubmit } = props;

  const cssClasses = [styles.Modal];

  if (isOpen) cssClasses.push(styles.Open);

  return (
    <div className={cssClasses.join(' ')}>
      <Header projectName={projectName} />
      {/* the content of the modal */}
      {children}
      <Footer onSubmit={onSubmit} />
    </div>
  );
};

export default Modal;

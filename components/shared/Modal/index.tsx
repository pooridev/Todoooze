import { ReactChild } from 'react';

import styles from './Modal.module.css';
import Header from './Header';
import Footer from './Footer';
import { useModal } from '../../../providers/Modal';

/**
 *
 * A component that renders the configured modal
 *
 * Hooks:
 * - useModal: use to open/close and config the modal.
 */
const Modal = () => {
  const { modalConfig } = useModal();
  const { isOpen, renderModalContent, onSubmit } = modalConfig;

  const cssClasses = [styles.Modal];

  if (isOpen) cssClasses.push(styles.Open);

  return (
    <form className={cssClasses.join(' ')} onSubmit={e => e.preventDefault()}>
      <Header />
      {/* the content of the modal */}
      {renderModalContent}
      <Footer />
    </form>
  );
};

export default Modal;

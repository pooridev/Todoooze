import { useModal } from '../../../../providers/Modal';

import styles from './Footer.module.css';

const Footer = () => {
  const { modalConfig, changeModaConfig } = useModal();
  const { onSubmit, cancelText, submitText } = modalConfig;
  const onClose = () => {
    changeModaConfig({
      isOpen: false
    });
  };
  return (
    <footer className={styles.Footer}>
      <button onClick={onClose} className={styles.CancelButton}>
        {cancelText || 'Cancel'}
      </button>
      <button type='submit' onClick={onSubmit} className={styles.SubmitButton}>
        {submitText || 'Save'}
      </button>
    </footer>
  );
};

export default Footer;

import { FC } from 'react';

import { useModal } from '../../../providers/Modal';
import styles from './Footer.module.css';

type PropsType = {
  onSubmit: () => void;
};

const Footer: FC<PropsType> = props => {
  const { onSubmit } = props;
  const { closeModal } = useModal();
  return (
    <footer className={styles.Footer}>
      <button
        className={styles.SubmitButton}
        onClick={() => {
          onSubmit();
          closeModal();
        }}>
        Save
      </button>
    </footer>
  );
};

export default Footer;

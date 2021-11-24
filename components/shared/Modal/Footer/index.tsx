import { FC } from 'react';

import { useModal } from '../../../../providers/Modal';
import styles from './Footer.module.css';

type PropsType = {
  onSubmit: () => void;
};

const Footer: FC<PropsType> = props => {
  const { onSubmit } = props;

  return (
    <footer className={styles.Footer}>
      <button className={styles.SubmitButton} onClick={onSubmit}>
        Save
      </button>
    </footer>
  );
};

export default Footer;

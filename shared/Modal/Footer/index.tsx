import { FC } from 'react';

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

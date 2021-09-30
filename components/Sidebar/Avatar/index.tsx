import { FC } from 'react';
import Image from 'next/image';

import userAvatar from '../../../assets/images/avatar.jpg';
import styles from './Avatar.module.css';

/**
 * @description a component that renders the user's avatar
 */

const Avatar: FC = () => {
  return (
    <div className={styles['Avatar']}>
      <Image
        width='40'
        height='40'
        className={styles['UserAvatar']}
        src={userAvatar}
        alt='pooria faramarzian'
      />
      <p>Pooria</p>
    </div>
  );
};

export default Avatar;

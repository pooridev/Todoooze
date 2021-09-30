import { FC } from 'react';
import Link from 'next/link';

import Icon from '../../../shared/Icon';
import styles from './Action.module.css';

/**
 *
 * @description Sidebar actions such as search and recent tasks link
 */

const Actions: FC = () => {
  return (
    <ul className={styles['Actions']}>
      <li className={styles['Action']}>
        <Link href='/search'>
          <a>
            <Icon iconName='search' className={styles['Icon']} />
            Search
          </a>
        </Link>
      </li>
      <li className={styles['Action']}>
        <Link href='/recent'>
          <a>
            <Icon iconName='recent' className={styles['Icon']} />
            Recent
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default Actions;

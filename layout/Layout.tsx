import { FC, ReactChild } from 'react';
import Sidebar from '../components/Sidebar';
import styles from './Layout.module.css';

type childrenType = ReactChild;

/**
 * @description main layout to render shared components around the app
 */

const Layout: FC<childrenType> = ({ children }) => (
  <div className={styles.Layout}>
    <Sidebar />
    <main className={styles.Main}>{children}</main>
  </div>
);

export default Layout;

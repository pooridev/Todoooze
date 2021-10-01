import { FC, ReactChild } from 'react';

import styles from './Navbar.module.css';

/**
 * @description A navbar with global styling for
 * rendering the children between opnening and closing tags.
 */

type INavbarProps = {
  children: ReactChild;
};

const Navbar: FC<INavbarProps> = ({ children }) => (
  <nav className={styles.Navbar}>{children}</nav>
);

export default Navbar;

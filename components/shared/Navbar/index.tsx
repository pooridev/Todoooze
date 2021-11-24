import { FC, ReactChild } from 'react';

import { useSidebar } from '../../../providers/Sidebar';
import { BarsIcon } from '../Icon';
import styles from './Navbar.module.css';

type INavbarProps = {
  children: ReactChild | ReactChild[];
};

/**
 * @description A navbar with global styling for
 * rendering the children between opnening and closing tags.
 *
 * @param children The children to render.
 *
 * openSidebar: The function to open the sidebar.
 */

const Navbar: FC<INavbarProps> = ({ children }) => {
  const { openSidebar } = useSidebar();

  return (
    <nav className={styles.Navbar}>
      <button className={styles.ToggleSidebar} onClick={openSidebar}>
        <BarsIcon className={styles.ToggleIcon} />
      </button>
      {children}
    </nav>
  );
};

export default Navbar;

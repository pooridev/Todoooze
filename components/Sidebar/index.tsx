import { useState } from 'react';

import styles from './Sidebar.module.css';
import Avatar from './Avatar/index';
import NewTask from './NewTask';
import Actions from './Actions/index';
import Lists from './Lists/index';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDropdownHandler = () => setIsOpen(true);
  const closeDropdownHandler = () => setIsOpen(false);

  return (
    <aside className={styles.Sidebar}>
      <Avatar />
      <NewTask
        onClose={closeDropdownHandler}
        isOpen={isOpen}
        onOpen={openDropdownHandler}
      />
      <Actions />
      <Lists />
    </aside>
  );
};

export default Sidebar;

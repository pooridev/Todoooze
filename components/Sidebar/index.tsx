import { useRef } from 'react';

import styles from './Sidebar.module.css';
import Avatar from './Avatar';
import NewTask from './NewProject';
import Actions from './Actions';
import Projects from './Projects';
import { useSidebar } from '../../providers/Sidebar';
import useOutsideClickHandler from './../../hooks/useOutsideClickHandler';

/**
 * @description main sidebar of the app
 *
 */

const Sidebar = () => {
  // isOpen: to determine if the sidebar is open or not
  // toggle: The function to call to toggle the sidebar.
  const { isOpen, closeSidebar } = useSidebar();

  const sidebarRef = useRef<HTMLElement | null>(null);

  const sidebarClasses = [styles.Sidebar];

  if (isOpen) sidebarClasses.push(styles.Open);

  // to close the sidebar when clicking outside of it
  useOutsideClickHandler({ callback: closeSidebar, ref: sidebarRef });

  return (
    <aside className={sidebarClasses.join(' ')} ref={sidebarRef}>
      <Avatar />
      <NewTask />
      <Actions />
      <Projects />
    </aside>
  );
};

export default Sidebar;

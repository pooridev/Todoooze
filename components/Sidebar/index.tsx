import { useRef } from "react";

import styles from "./Sidebar.module.css";
import Avatar from "./Avatar";
import Actions from "./Actions";
import Projects from "./Projects";
import { useSidebar } from "../../providers/Sidebar";
import useOutsideClickHandler from "./../../hooks/useOutsideClickHandler";
import classNames from "classnames";
import NewProject from "./NewProject";

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebar();

  const sidebarRef = useRef<HTMLElement | null>(null);

  useOutsideClickHandler({ callback: closeSidebar, ref: sidebarRef });

  return (
    <aside className={classNames(styles.Sidebar, { [styles.Open]: isOpen })} ref={sidebarRef}>
      <Avatar />
      <NewProject />
      <Actions />
      <Projects />
    </aside>
  );
};

export default Sidebar;

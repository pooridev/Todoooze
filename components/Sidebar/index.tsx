"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import styles from "./Sidebar.module.css";
import Avatar from "./Avatar";
import Actions from "./Actions";
import Lists from "./Lists";
import { useSidebar } from "../../providers/Sidebar";
import useOutsideClickHandler from "../../hooks/useOutsideClickHandler";
import classNames from "classnames";
import NewProject from "./NewProject";

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebar();

  const pathname = usePathname();

  const sidebarRef = useRef<HTMLElement | null>(null);

  useOutsideClickHandler({ callback: closeSidebar, ref: sidebarRef });

  // The sidebar persists across navigations, so close the mobile drawer
  // explicitly when the route changes.
  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <aside className={classNames(styles.Sidebar, { [styles.Open]: isOpen })} ref={sidebarRef}>
      <Avatar />
      <NewProject />
      <Actions />
      <Lists />
    </aside>
  );
};

export default Sidebar;

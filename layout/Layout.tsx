import { PropsWithChildren } from "react";
import Modal from "../components/shared/Modal";

import Sidebar from "../components/Sidebar";
import styles from "./Layout.module.css";

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Modal />
    <div className={styles.Layout}>
      <Sidebar />
      <main className={styles.Main}>{children}</main>
    </div>
  </>
);

export default Layout;

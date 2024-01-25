import { PropsWithChildren } from "react";

import Sidebar from "../components/Sidebar";
import styles from "./Layout.module.css";

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <div className={styles.Layout}>
      <Sidebar />
      <main className={styles.Main}>{children}</main>
    </div>
  </>
);

export default Layout;

import { PropsWithChildren } from "react";

import styles from "./styles.module.css";

const MyAccountLayout = ({ children }: PropsWithChildren) => {
  return <div className={styles.layout}>{children}</div>;
};

export default MyAccountLayout;

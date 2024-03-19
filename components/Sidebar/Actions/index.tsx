import { FC } from "react";
import Link from "next/link";

import { RecentIcon, SearchIcon } from "../../shared/Icon";
import styles from "./Action.module.css";

/**
 *
 * @description Sidebar actions such as search and recent tasks link
 */

const Actions: FC = () => {
  return (
    <ul className={styles["Actions"]}>
      <li className={styles["Action"]}>
        <Link href="/search">
          <SearchIcon className={styles["Icon"]} />
          Search
        </Link>
      </li>
      <li className={styles["Action"]}>
        <Link href="/recent">
          <RecentIcon className={styles["Icon"]} />
          Recent
        </Link>
      </li>
    </ul>
  );
};

export default Actions;

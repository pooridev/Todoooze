import { FC } from "react";
import Image from "next/image";

import styles from "./Avatar.module.css";

/**
 * @description a component that renders the user's avatar
 */

const Avatar: FC = () => {
  return (
    <div className={styles["Avatar"]}>
      <Image
        width={40}
        height={40}
        className={styles["UserAvatar"]}
        src="/assets/images/avatar.jpg"
        alt="pooria faramarzian"
      />
      <p>Pooria</p>
    </div>
  );
};

export default Avatar;

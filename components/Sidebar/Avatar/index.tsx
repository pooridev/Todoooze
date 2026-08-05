"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./Avatar.module.css";
import { useProfile } from "../../../providers/Profile";

/**
 * @description renders the user's avatar and display name, linking to the account page
 */

const Avatar: FC = () => {
  const { profile } = useProfile();

  return (
    <Link href="/my-account" className={styles["Avatar"]} title="My account">
      <Image
        width={40}
        height={40}
        className={styles["UserAvatar"]}
        src="/assets/images/avatar.jpg"
        alt={profile.name}
      />
      <p>{profile.name}</p>
    </Link>
  );
};

export default Avatar;

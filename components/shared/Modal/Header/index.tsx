import { Fragment } from "react";

import { CloseIcon, ProfileIcon } from "../../Icon";

import styles from "./Header.module.css";
import Link from "next/link";

interface Props {
  breadcrumb?: {
    label: string;
    href: string;
    isMain: boolean;
  }[];
  toggle: (state: boolean) => void;
}

const Header = ({ breadcrumb, toggle }: Props) => {
  const onClose = () => toggle(false);

  return (
    <header className={styles.Header}>
      {/* some info about the content */}
      <div className={styles.Info}>
        {breadcrumb?.map((item) => (
          <Fragment key={item.href}>
            {item.isMain ? (
              <h5 className={styles.Label} title="List name">
                <ProfileIcon />
                <Link href={item.href}>{item.label}</Link>
              </h5>
            ) : (
              <p>
                <Link href={item.href}>{item.label}</Link>
              </p>
            )}
          </Fragment>
        ))}
      </div>

      <button title="Close modal" type="button" className={styles.CloseModalButton} onClick={onClose}>
        <CloseIcon />
      </button>
    </header>
  );
};

export default Header;

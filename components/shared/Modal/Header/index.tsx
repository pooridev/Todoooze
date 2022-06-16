import { FC, Fragment } from 'react';

import { CloseIcon, ProfileIcon } from '../../Icon';
import { useModal } from '../../../../providers/Modal';
import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  const { modalConfig, changeModaConfig } = useModal();
  const { breadcrumb } = modalConfig;

  const onClose = () => {
    changeModaConfig({
      isOpen: false
    });
  };

  return (
    <header className={styles.Header}>
      {/* some info about the content */}
      <div className={styles.Info}>
        {breadcrumb?.map(item => (
          <Fragment key={item.href}>
            {item.isMain ? (
              <h5 className={styles.Label} title='Project name'>
                <ProfileIcon />
                <Link href={item.href}>{item.label}</Link>
              </h5>
            ) : (
              <p>
                <Link href={item.href}>
                  <a>› {item.label}</a>
                </Link>
              </p>
            )}
          </Fragment>
        ))}
      </div>
      {/* use to close the modal */}
      <button
        title='Close modal'
        type='button'
        className={styles.CloseModalButton}
        onClick={onClose}>
        <CloseIcon />
      </button>
    </header>
  );
};

export default Header;

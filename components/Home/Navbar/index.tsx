import React from 'react';
import moment from 'moment';

import Navbar from './../../../shared/Navbar/index';
import styles from './Navbar.module.css';

/**
 *
 * @description the navbar that renders on the Home page
 */

const HomeNavbar = () => {
  const today = moment().format('dddd');
  return (
    <Navbar>
      <h2 className={styles.Title}>{today}&apos;s tasks</h2>
    </Navbar>
  );
};

export default HomeNavbar;

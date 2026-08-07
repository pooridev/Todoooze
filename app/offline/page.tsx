"use client";
import Link from "next/link";

import Navbar from "../../components/shared/Navbar/Navbar";
import styles from "./Offline.module.css";

const OfflinePage = () => (
  <>
    <Navbar>
      <h2 className={styles.Title}>Offline</h2>
    </Navbar>
    <div className={styles.Content}>
      <h1 className={styles.Heading}>You&apos;re offline</h1>
      <p className={styles.Copy}>
        Todoooze couldn&apos;t reach the network, and this page isn&apos;t cached yet. Your lists and
        tasks still live on this device — open a page you&apos;ve visited before, or reconnect and try
        again.
      </p>
      <Link href="/" className={styles.Link}>
        Go home
      </Link>
    </div>
  </>
);

export default OfflinePage;

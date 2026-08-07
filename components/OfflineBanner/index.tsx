"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./OfflineBanner.module.css";

/**
 * A slim status strip that appears when the browser goes offline.
 * Data already lives in localStorage, so the app keeps working — this just
 * makes the network state visible.
 */
const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const update = () => setIsOffline(!navigator.onLine);

    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);

    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          className={styles.Banner}
          role="status"
          aria-live="polite"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          You&apos;re offline — changes are saved on this device and will stay available.
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineBanner;

"use client";

import { useState } from "react";
import { RegistrationMode } from "./types";

import { motion, AnimatePresence, Variant } from "framer-motion";

import styles from "./styles.module.css";

const confirmPasswordVariants: Record<RegistrationMode, Variant> = {
  signUp: { opacity: 1, y: 0 },
  login: { opacity: 0, y: "40%" },
};

const MyAccountPage = () => {
  const [mode, setMode] = useState<RegistrationMode>("login");

  return (
    <div className={styles.myAccount}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.fields}>
          <input
            className={styles.field}
            placeholder={`Enter your ${mode == "signUp" ? "desired" : ""} username`}
            type="text"
            autoComplete="username"
            name="username"
          />
          <input
            className={styles.field}
            autoComplete="new-password"
            placeholder="Enter your password"
            type="password"
            name="password"
          />

          <motion.input
            initial={{ opacity: 0 }}
            animate={mode}
            transition={{
              duration: 0.1,
            }}
            disabled={mode == "login"}
            autoComplete="new-password"
            variants={confirmPasswordVariants}
            className={styles.field}
            placeholder="Repeat your password"
            type="password"
            name="confirm-password"
          />
        </div>
        <footer>
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.99, transition: { duration: 0.1, type: "tween" } }}
            className={styles.submitButton}
          >
            {mode == "login" ? "Login" : "Sign up"}
          </motion.button>
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.99, transition: { duration: 0.1, type: "tween" } }}
            onClick={() => setMode(mode == "login" ? "signUp" : "login")}
            className={styles.haveAccountButton}
          >
            {mode == "login" ? "Create an account?" : "Have an account?"}
          </motion.button>
        </footer>
      </form>
    </div>
  );
};

export default MyAccountPage;

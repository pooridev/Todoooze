"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../../components/shared/Navbar/Navbar";
import { useProfile } from "../../providers/Profile";
import styles from "./styles.module.css";

const MyAccountPage = () => {
  const { profile, updateProfile } = useProfile();

  const [name, setName] = useState(profile.name);
  const [isSaved, setIsSaved] = useState(false);

  const savedTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Keep the field in sync once the profile hydrates from storage.
  useEffect(() => {
    setName(profile.name);
  }, [profile.name]);

  useEffect(() => () => clearTimeout(savedTimeout.current), []);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) return;

    updateProfile({ name: trimmed });

    setIsSaved(true);
    clearTimeout(savedTimeout.current);
    savedTimeout.current = setTimeout(() => setIsSaved(false), 2000);
  };

  const clearDataHandler = () => {
    const confirmed = window.confirm(
      "This removes all your lists, tasks and profile data from this browser. Continue?"
    );

    if (!confirmed) return;

    window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <Navbar>
        <h2 className={styles.navTitle}>My account</h2>
      </Navbar>
      <div className={styles.centered}>
        <div className={styles.myAccount}>
          <form className={styles.form} onSubmit={submitHandler}>
            <div>
              <h1 className={styles.heading}>Profile</h1>
              <p className={styles.hint}>
                Todoooze runs entirely in your browser — no account or sign-up needed. Your data is stored locally
                on this device.
              </p>
            </div>

            <div className={styles.fields}>
              <label className={styles.label} htmlFor="display-name">
                Display name
              </label>
              <input
                id="display-name"
                className={styles.field}
                placeholder="How should we call you?"
                type="text"
                autoComplete="name"
                name="display-name"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>

            <footer>
              <motion.button
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.99, transition: { duration: 0.1, type: "tween" } }}
                className={styles.submitButton}
                type="submit"
              >
                {isSaved ? "Saved!" : "Save"}
              </motion.button>

              <button type="button" onClick={clearDataHandler} className={styles.dangerButton}>
                Clear all local data
              </button>
            </footer>
          </form>
        </div>
      </div>
    </>
  );
};

export default MyAccountPage;

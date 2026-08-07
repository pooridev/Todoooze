"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import TasksArea from "../components/TasksArea";
import Navbar from "../components/shared/Navbar/Navbar";
import ListProgress from "../components/shared/ListProgress";
import styles from "./Home.module.css";
import { useLists } from "../providers/Lists";

const Home = () => {
  const router = useRouter();

  const lists = useLists();
  const firstList = Object.values(lists)[0];
  const firstListId = firstList?.id;

  useEffect(() => {
    if (firstListId) router.replace(`/list/${firstListId}`);
  }, [firstListId, router]);

  if (!firstList) {
    return (
      <>
        <Navbar>
          <h2 className={styles.Title}>Todoooze</h2>
        </Navbar>
        <div className={styles.EmptyState}>
          <h3>No lists yet</h3>
          <p>Create your first list from the sidebar to get started.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar>
        <h2 className={styles.Title}>{firstList.title}&apos;s tasks </h2>
        <ListProgress tasks={firstList.tasks} columns={firstList.columns} />
      </Navbar>
      <TasksArea list={firstList} />
    </>
  );
};

export default Home;

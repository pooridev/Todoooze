"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import TasksArea from "../../../components/TasksArea";
import Navbar from "../../../components/shared/Navbar/Navbar";
import ListProgress from "../../../components/shared/ListProgress";
import styles from "./List.module.css";
import { useLists, useListsHydrated } from "../../../providers/Lists";

const ProjectPage = () => {
  const query = useParams();
  const listId = String(query.list_id);

  const lists = useLists();
  const isHydrated = useListsHydrated();

  const list = lists[listId];
  const listTitle = list?.title;

  useEffect(() => {
    if (listTitle) document.title = listTitle;
  }, [listTitle]);

  if (!list) {
    return (
      <>
        <Navbar>
          <h2 className={styles.Title}>List not found</h2>
        </Navbar>
        {/* Wait for localStorage hydration before claiming the list doesn't exist. */}
        {isHydrated && (
          <div className={styles.NotFound}>
            <p>This list doesn&apos;t exist — it may have been deleted.</p>
            <Link href="/">Go back home</Link>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Navbar>
        <h2 className={styles.Title} title={list.description}>
          {listTitle}&apos;s tasks{" "}
        </h2>
        <ListProgress tasks={list.tasks} />
      </Navbar>
      <TasksArea list={list} />
    </>
  );
};

export default ProjectPage;

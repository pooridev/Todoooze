import { useRouter } from "next/dist/client/router";

import TasksArea from "../../components/TasksArea";
import Navbar from "../../components/shared/Navbar/Navbar";
import styles from "./List.module.css";
import { useLists } from "../../providers/Lists";
import { useEffect } from "react";

const ProjectPage = () => {
  const router = useRouter();
  const listId = String(router.query.list_id);

  const lists = useLists();
  const list = lists[listId] ?? {};

  const listTitle = list.title;

  useEffect(() => {
    if (listTitle) document.title = listTitle;
  }, [listId]);

  return (
    <>
      <Navbar>
        <h2 className={styles.Title}>{listTitle}&apos; tasks </h2>
      </Navbar>
      <TasksArea list={list!} />
    </>
  );
};

export default ProjectPage;

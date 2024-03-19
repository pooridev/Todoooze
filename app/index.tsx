import TasksArea from "../components/TasksArea";
import Navbar from "../components/shared/Navbar/Navbar";
import styles from "./Home.module.css";
import { useLists } from "../providers/Lists";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const lists = useLists();
  const latestList = Object.values(lists)[0];

  useEffect(() => {
    router.push(`/list/${latestList.id}`);
  }, [latestList.id]);

  return (
    <>
      <Navbar>
        <h2 className={styles.Title}>{latestList?.title}&apos; tasks </h2>
      </Navbar>
      <TasksArea list={latestList} />
    </>
  );
};

export default Home;

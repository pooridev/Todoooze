import TasksArea from "../components/TasksArea";
import Navbar from "../components/shared/Navbar/Navbar";
import styles from "./Home.module.css";
import { useProjects } from "../providers/Projects";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  const projects = useProjects();
  const latestProject = Object.values(projects)[0];

  useEffect(() => {
    router.push(`/project/${latestProject.id}`);
  }, [latestProject.id]);

  return (
    <>
      <Navbar>
        <h2 className={styles.Title}>{latestProject?.title}&apos; tasks </h2>
      </Navbar>
      <TasksArea project={latestProject} />
    </>
  );
};

export default Home;

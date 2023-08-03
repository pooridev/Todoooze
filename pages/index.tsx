import { useSelector } from "react-redux";

import TasksArea from "../components/TasksArea";
import Navbar from "../components/shared/Navbar/Navbar";
import { IProjectState } from "./../types/IProjectState";
import styles from "./Home.module.css";
import { useProjects } from "../providers/Projects";

const Home = () => {
  // All projects that made by user
  const { projects } = useProjects();

  // We would render the most recent project on the home page
  const recentProject = Object.values(projects)[0];
  return (
    <>
      <Navbar>
        <h2 className={styles.Title}>{recentProject?.title}&apos; tasks </h2>
      </Navbar>
      <TasksArea project={recentProject} />
    </>
  );
};

export default Home;

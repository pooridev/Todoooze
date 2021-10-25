import { useSelector } from 'react-redux';

import TasksArea from '../components/TasksArea';
import Navbar from '../components/shared/Navbar';
import { IProjectState } from './../types/IProjectState';
import styles from './Home.module.css';

const Home = () => {
  // All projects that made by user
  const projects = useSelector((state: IProjectState) => state.projects);

  // We would render the most recent project on the home page
  const recentProject = projects[projects.length - 1];
  return (
    <>
      <Navbar>
        <h2 className={styles.Title}>{recentProject?.title}&apos; tasks </h2>
      </Navbar>
      <TasksArea />
    </>
  );
};

export default Home;

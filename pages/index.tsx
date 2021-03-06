import { useSelector } from 'react-redux';

import TasksArea from '../components/TasksArea';
import Navbar from '../components/shared/Navbar/Navbar';
import { IProjectState } from './../types/RootState';
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
      <TasksArea project={recentProject} />
    </>
  );
};

export default Home;

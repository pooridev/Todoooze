import TasksArea from '../components/TasksArea';
import Navbar from './../shared/Navbar/index';
import { useSelector } from 'react-redux';
import { IProjectState } from './../types/IProjectState';

const Home = () => {
  // All projects that made by user
  const projects = useSelector((state: IProjectState) => state.projects);

  // We would render the most recent project on the home page
  const recentProject = projects[projects.length - 1];
  return (
    <>
      <Navbar>{recentProject.title}&apos; tasks</Navbar>
      <TasksArea />
    </>
  );
};

export default Home;

import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import TasksArea from '../../components/TasksArea';

import Navbar from '../../shared/Navbar';
import { ProjectType } from '../../types/ProjectType';
import { IProjectState } from './../../types/IProjectState';
import styles from './project.module.css';
const ProjectPage = () => {
  const router = useRouter();

  // The given ID in the path
  const { project_id } = router.query;

  // All projects that made by user
  const projects = useSelector((state: IProjectState) => state.projects);

  // Find that particular project, so we can render its tasks
  const project = projects.find((p: ProjectType) => p?.id === project_id);
  
  return (
    <>
      <Navbar>
        <h2 className={styles.Title}>{project?.title}&apos; tasks </h2>
      </Navbar>
      <TasksArea />
    </>
  );
};

export default ProjectPage;

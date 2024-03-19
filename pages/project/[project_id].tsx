import { useRouter } from "next/dist/client/router";

import TasksArea from "../../components/TasksArea";
import Navbar from "../../components/shared/Navbar/Navbar";
import styles from "./project.module.css";
import { useProjects } from "../../providers/Projects";
import { useEffect } from "react";

const ProjectPage = () => {
  const router = useRouter();
  const projectId = String(router.query.project_id);

  const projects = useProjects();
  const project = projects[projectId] ?? {};

  const projectTitle = project.title;

  useEffect(() => {
    if (projectTitle) document.title = projectTitle;
  }, [projectId]);

  return (
    <>
      <Navbar>
        <h2 className={styles.Title}>{projectTitle}&apos; tasks </h2>
      </Navbar>
      <TasksArea project={project!} />
    </>
  );
};

export default ProjectPage;

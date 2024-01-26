import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";

import TasksArea from "../../components/TasksArea";
import Navbar from "../../components/shared/Navbar/Navbar";
import { ProjectType } from "../../types/ProjectType";
import { IProjectState } from "./../../types/IProjectState";
import styles from "./project.module.css";
import { useProjects } from "../../providers/Projects";
import { useEffect } from "react";

const ProjectPage = () => {
  const router = useRouter();
  const { project_id } = router.query;

  const projects = useProjects();
  const project = projects[String(project_id)] ?? {};

  useEffect(() => {
    if (project.title) document.title = project.title;
  }, [project_id]);

  return (
    <>
      <Navbar>
        <h2 className={styles.Title}>{project?.title}&apos; tasks </h2>
      </Navbar>
      <TasksArea project={project!} />
    </>
  );
};

export default ProjectPage;

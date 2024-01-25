import { FC, useState } from "react";
import Link from "next/link";

import styles from "./Projects.module.css";
import { ArrowRight, ThreeDotsIcon } from "../../shared/Icon";
import { ProjectType } from "../../../types/ProjectType";

import { useProjects } from "../../../providers/Projects";
import classNames from "classnames";
import { useRouter } from "next/router";

const Projects: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const projects = useProjects();

  const projectsArr = Object.entries(projects);

  const toggleListsDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.Lists}>
      <header
        className={classNames(styles.Header, { [styles.ListDropDownOpen]: isOpen })}
        onClick={toggleListsDropdown}
      >
        <h3 className="flex justify-between">
          Your projects
          <ArrowRight className={classNames(isOpen && styles.RotateArrow)} />
        </h3>
      </header>
      <ul className={classNames(styles.Projects, isOpen && styles.Open)}>
        {projectsArr.map(([projectId, project]) => (
          <ProjectListItem project={project} key={projectId} />
        ))}
      </ul>
    </div>
  );
};

const ProjectListItem = ({ project }: { project: ProjectType }) => {
  const router = useRouter();

  const isLinkActive = (pathname: string) => router.asPath == pathname;

  return (
    <li key={project.id} className={styles.Project}>
      <span className={classNames(styles.Title, { [styles.ActiveLink]: isLinkActive(`/project/${project.id}`) })}>
        <Link href={`/project/${project.id}`} passHref>
          <a className="flex-grow">{project.title}</a>
        </Link>
        <button className={styles.OpenOptionsButton}>
          <ThreeDotsIcon />
        </button>
      </span>
    </li>
  );
};

export default Projects;

import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import styles from "./Projects.module.css";
import { openList } from "../../../redux/actions/project";
import { ArrowRight, ThreeDotsIcon } from "../../shared/Icon";
import { IProjectState } from "../../../types/IProjectState";
import { ProjectType } from "../../../types/ProjectType";
import { TaskType } from "../../../types/Task";
import { removeFalseys } from "../../../helpers/string-utils";
import { useProjects } from "../../../providers/Projects";

/**
 * @description a component that renders a list of projects on the main sidebar.
 */
const Projects: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { projects } = useProjects();

  const projectsArr = Object.entries(projects);

  const toggleListsDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.Lists}>
      <header className={styles.Header} onClick={toggleListsDropdown}>
        <h3>
          Your projects
          <ArrowRight className={removeFalseys(isOpen && styles.RotateArrow)} />
        </h3>
      </header>
      <ul className={removeFalseys(styles.Projects, isOpen && styles.Open)}>
        {projectsArr.map(([projectId, project]) => (
          <ProjectListItem project={project} key={projectId} />
        ))}
      </ul>
    </div>
  );
};

const ProjectListItem = ({ project }: { project: ProjectType }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log({
    project,
    isOpen,
  });

  return (
    <li
      onClick={setIsOpen.bind(this, !isOpen)}
      key={project.id}
      className={styles.Project}
    >
      <div className={styles.Title}>
        <span className="flex items-center w-full gap-2">
          <ArrowRight className={removeFalseys(isOpen && styles.RotateArrow)} />
          <span>{project.title}</span>
        </span>
        <button className={styles.OpenOptionsButton}>
          <ThreeDotsIcon />
        </button>
      </div>
      <ul className={removeFalseys(styles.Tasks, isOpen && styles.OpenTasks)}>
        {project.tasks
          .filter((task) => task.status === "Todo")
          .slice(0, 3)
          .map((task) => (
            <li className={styles.Task} key={task.id}>
              <input
                type="checkbox"
                id={task.title}
                className={styles.TaskCheckbox}
              />
              <label htmlFor={task.title}>{task.title}</label>
            </li>
          ))}
        <li className={styles.Task}>
          <Link href={`/project/${project.id}`}>Go To Project</Link>
        </li>
      </ul>
    </li>
  );
};

export default Projects;

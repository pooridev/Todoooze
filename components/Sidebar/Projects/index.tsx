import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import styles from './Projects.module.css';
import { openList } from '../../../redux/actions/project';
import { ArrowRight, ThreeDotsIcon } from '../../shared/icon';
import { IProjectState } from '../../../types/IProjectState';
import { ProjectType } from '../../../types/ProjectType';
import { TaskType } from '../../../types/TaskType';
import { removeFalseys } from '../../../helpers/string-utils';

/**
 * @description a component that renders a list of projects on the main sidebar.
 */
const Projects: FC = () => {
  const [areProjectsOpen, setAreProjectsOpen] = useState(false);
  const { projects } = useSelector((state: IProjectState) => state);

  const dispatch = useDispatch();

  const toggleListsDropdown = () => setAreProjectsOpen(prev => !prev);

  return (
    <div className={styles.Lists}>
      <header className={styles.Header} onClick={toggleListsDropdown}>
        <h3>
          Your projects
          <ArrowRight
            className={removeFalseys(areProjectsOpen && styles.RotateArrow)}
          />
        </h3>
      </header>
      <ul
        className={removeFalseys(
          styles.Projects,
          areProjectsOpen && styles.Open
        )}>
        {projects.map((project: ProjectType) => (
          <li key={project.id} className={styles.Project}>
            <div
              key={project.id}
              className={styles.Title}
              onClick={() => dispatch(openList(project.id))}>
              <span className='flex items-center gap-2 w-full'>
                <ArrowRight
                  className={removeFalseys(
                    project.isOpen && styles.RotateArrow
                  )}
                />
                <span>{project.title}</span>
              </span>
              <button className={styles.OpenOptionsButton}>
                <ThreeDotsIcon />
              </button>
            </div>
            <ul
              className={removeFalseys(
                styles.Tasks,
                project.isOpen && styles.OpenTasks
              )}>
              {project.tasks
                .filter(task => task.status === 'todo')
                .slice(0, 3)
                .map((task: TaskType) => (
                  <li className={styles.Task} key={task.id}>
                    <input
                      type='checkbox'
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
        ))}
      </ul>
    </div>
  );
};

export default Projects;

import Link from 'next/link';
import { FC, useState } from 'react';
import { removeFalseys } from '../../../../helpers/string-utils';

import { ProjectType } from '../../../../types/ProjectType';
import { ArrowRight, ThreeDotsIcon } from '../../../shared/Icon';
import styles from './ProjectListItem.module.css';

const ProjectListItem: FC<ProjectType> = ({ tasks, title, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleProject = () => setIsOpen(prev => !prev);

  return (
    <li key={id} className={styles.Project}>
      <div className={styles.Title} onClick={toggleProject}>
        <span className='flex items-center w-full gap-2'>
          <ArrowRight
            className={removeFalseys(
              isOpen && styles.RotateArrow,
              'arrow-icon'
            )}
          />
          <span>{title}</span>
        </span>
        <button className={styles.OpenMenuButton}>
          <ThreeDotsIcon />
        </button>
      </div>
      <ul
        role='list'
        className={removeFalseys(styles.Tasks, isOpen && styles.OpenTasks)}>
        {tasks
          .filter(task => task.status?.title === 'Todo')
          .slice(0, 3)
          .map(task => (
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
          <Link href={`/project/${id}`}>Go To Project</Link>
        </li>
      </ul>
    </li>
  );
};

export default ProjectListItem;

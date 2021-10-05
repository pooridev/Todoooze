import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Lists.module.css';
import { openList } from '../../../redux/actions/project';
import { ArrowRight, ThreeDotsIcon } from '../../../shared/icon';
import { IProjectState } from '../../../types/IProjectState';
import { ProjectType } from '../../../types/ProjectType';
import { TaskType } from '../../../types/TaskType';

/**
 *
 * @description a component that renders a list of projects on the main sidebar.
 */

const Lists: FC = () => {
  const [areListsOpen, setAreListsOpen] = useState(false);
  const { projects } = useSelector((state: IProjectState) => state);

  const dispatch = useDispatch();

  const toggleListsDropdown = () => setAreListsOpen(prev => !prev);

  return (
    <div className={styles['Lists']}>
      <header className={styles['Header']} onClick={toggleListsDropdown}>
        <h3>
          Your projects
          <ArrowRight className={areListsOpen ? styles['RotateArrow'] : ''} />
        </h3>
      </header>
      <ul
        className={`${styles['TaskLists']}${
          areListsOpen ? styles['Open'] : ''
        }`}>
        {projects.map((item: ProjectType) => (
          <li key={item.id} className={styles['List']}>
            <div
              key={item.id}
              className={styles['Title']}
              onClick={() => dispatch(openList(item['id']))}>
              <span className='flex items-center gap-2 w-full'>
                <ArrowRight
                  className={item['isOpen'] ? styles['RotateArrow'] : ''}
                />
                <span>{item['title']}</span>
              </span>
              <button className={styles['OpenOptionsButton']}>
                <ThreeDotsIcon />
              </button>
            </div>
            <ul
              className={`${styles['Tasks']} ${
                item['isOpen'] ? styles['OpenTasks'] : ''
              }`}>
              {item['tasks'].map((task: TaskType) => (
                <li className={styles['Task']} key={task['id']}>
                  <input
                    type='checkbox'
                    id={task['title']}
                    className={styles['TaskCheckbox']}
                  />
                  <label htmlFor={task['title']}>{task['title']}</label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lists;

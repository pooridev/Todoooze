import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Lists.module.css';
import { openList } from './../../../redux/actions/List';
import Icon from './../../../shared/Icon';
import { IListState } from '../../../types/IListState';

type IListItem = {
  id: number;
  isOpen: boolean;
  isMenuOpen: boolean;
  title: string;
  tasks: Array<{ id: number; title: string }>;
};

/**
 *
 * @description a component that renders a list of task lists on the sidebar.
 */

const Lists: FC = () => {
  const [areListsOpen, setAreListsOpen] = useState(false);
  const { lists } = useSelector((state: IListState) => state);

  const dispatch = useDispatch();

  const toggleListsDropdown = () => setAreListsOpen(prev => !prev);

  return (
    <div className={styles['Lists']}>
      <header className={styles['Header']} onClick={toggleListsDropdown}>
        <h3>
          Your lists
          <Icon
            iconName='arrowRight'
            className={areListsOpen ? styles['RotateArrow'] : ''}
          />
        </h3>
      </header>
      <ul
        className={`${styles['TaskLists']}${
          areListsOpen ? styles['Open'] : ''
        }`}>
        {lists.map((item: IListItem) => (
          <li key={item.id} className={styles['List']}>
            <div
              key={item.id}
              className={styles['Title']}
              onClick={() => dispatch(openList(item['id']))}>
              <span className='flex items-center gap-2 w-full'>
                <Icon
                  iconName='arrowRight'
                  className={item['isOpen'] ? styles['RotateArrow'] : ''}
                />
                <span>{item['title']}</span>
              </span>
              <button className={styles['OpenOptionsButton']}>
                <Icon iconName='threeDots' />
              </button>
            </div>
            <ul
              className={`${styles['Tasks']} ${
                item['isOpen'] ? styles['OpenTasks'] : ''
              }`}>
              {item['tasks'].map((task: { id: number; title: string }) => (
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

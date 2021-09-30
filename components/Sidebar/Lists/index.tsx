import { FC, useState, MouseEvent } from 'react';

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import styles from './Lists.module.css';
import { openList, openMenu, closeMenu } from './../../../redux/actions/List';
import Icon from './../../../shared/Icon';

type IListItem = {
  id: number;
  isOpen: boolean;
  isMenuOpen: boolean;
  title: string;
  tasks: Array<{ id: number; title: string }>;
};

const Lists: FC = () => {
  const [areListsOpen, setAreListsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { lists } = useSelector((state: RootStateOrAny) => state);

  const toggleListsDropdown = () => setAreListsOpen(prev => !prev);

  const openListOptionsHandler = (
    e: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    dispatch(openMenu(id));
  };

  const closeListOptionsHandler = (id: number) => {
    console.log(id);
    dispatch(closeMenu(id));
  };

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
              <button
                onClick={event => openListOptionsHandler(event, item['id'])}
                className={styles['OpenOptionsButton']}>
                <Icon iconName='threeDots' />
              </button>
            </div>
            <ul
              className={`${styles['Tasks']} ${
                item['isOpen'] ? styles['OpenTasks'] : ''
              }`}>
              {item['tasks'].map((task: { id: number; title: string }) => (
                <li className={styles['Task']} key={task['id']}>
                  <Icon iconName='solidCircle' />
                  {task['title']}
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

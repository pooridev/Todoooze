import { FC, ReactElement, useState, useRef } from 'react';

import styles from './Menu.module.css';
import useOutsideClickHandler from './../../../../hooks/useOutsideClickHandler';

interface IProps {
  items: Array<{
    title: string;
    icon?: ReactElement;
  }>;

  onChange: (selectedItem) => void;

  defaultChecked?: {
    title: string;
    icon?: ReactElement;
  };
  label: {
    title: string;
    icon?: ReactElement;
  };
}

/**
 * @description Menu component that renders a list of items
 */

const Menu: FC<IProps> = props => {
  const { items, onChange, defaultChecked, label } = props;

  const menuRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const menuClasses = [styles.Menu];

  // If isOpen was true, add the Open class
  if (isOpen) menuClasses.push(styles.Open);

  // Close menu if clicked outside
  useOutsideClickHandler({ ref: menuRef, callback: closeMenu });

  return (
    <div className='relative'>
      <button className={styles.Button} onClick={openMenu}>
        <span>{defaultChecked?.icon || label?.icon}</span>
        <span>{defaultChecked?.title || label.title}</span>
      </button>
      <div className={menuClasses.join(' ')}>
        <ul ref={menuRef} className={styles.Items}>
          {items.map(item => (
            <li
              key={item.title}
              className={styles.Item}
              onClick={() => {
                onChange(item);
                closeMenu();
                // To update the button content (icon and title)
                label.icon = item.icon;
                label.title = item.title;
              }}>
              {item?.icon}
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;

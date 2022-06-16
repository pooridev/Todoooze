import { FC, ReactElement, useState, useRef } from 'react';

import styles from './Select.module.css';
import useOutsideClickHandler from '../../../hooks/useOutsideClickHandler';

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
  value: {
    title: string;
    icon?: ReactElement;
  };
}

/**
 * @description Select component that renders a list of selectable items
 */

const Select: FC<IProps> = props => {
  const { items, onChange, defaultChecked, value } = props;

  const SelectRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openSelect = () => setIsOpen(true);
  const closeSelect = () => setIsOpen(false);

  const SelectClasses = [styles.Select];

  // If isOpen was true, add the Open class
  if (isOpen) SelectClasses.push(styles.Open);

  // Close menu if clicked outside
  useOutsideClickHandler({ ref: SelectRef, callback: closeSelect });

  return (
    <div className='relative'>
      <button className={styles.Button} onClick={openSelect}>
        <span>{defaultChecked?.icon || value?.icon}</span>
        <span>{defaultChecked?.title || value.title}</span>
      </button>
      <div className={SelectClasses.join(' ')}>
        <ul ref={SelectRef} className={styles.Items}>
          {items.map(item => (
            <li
              key={item.title}
              className={styles.Item}
              onClick={() => {
                onChange(item);
                closeSelect();
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

export default Select;

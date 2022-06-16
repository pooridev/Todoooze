import { FC, ReactElement, useState, useRef } from 'react';

import styles from './Select.module.css';
import useOutsideClickHandler from '../../../hooks/useOutsideClickHandler';

interface IProps {
  items: Array<{
    title: string;
    icon?: ReactElement;
  }>;
  /** @default  contained */
  variant?: 'outline' | 'contained';
  onChange?: <T>(selectedItem: T) => void;
  readonly?: boolean;
  iconOnly?: boolean;

  defaultChecked?: {
    title: string;
    icon?: ReactElement | JSX.Element;
  };
  value: {
    title: string;
    icon?: ReactElement | JSX.Element;
  };
}

/**
 * @description Select component that renders a list of selectable items
 */

const Select: FC<IProps> = props => {
  const {
    items,
    onChange,
    defaultChecked,
    value,
    readonly,
    variant = 'contained',
    iconOnly = false
  } = props;

  const SelectRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openSelect = () => setIsOpen(true);
  const closeSelect = () => setIsOpen(false);

  const selectClasses = [styles.Select];
  const buttonClasses = [styles.Button];

  // If isOpen was true, add the Open class
  if (isOpen) selectClasses.push(styles.Open);

  if (variant === 'outline') {
    buttonClasses.push(styles.Outline);
  }

  // Close menu if clicked outside
  useOutsideClickHandler({ ref: SelectRef, callback: closeSelect });

  return (
    <div className='relative'>
      <button className={buttonClasses.join(' ')} onClick={openSelect}>
        <span>{defaultChecked?.icon || value?.icon}</span>
        {(!iconOnly && defaultChecked?.title) ||
          (!iconOnly && <span>{value.title}</span>)}
      </button>
      {!readonly && (
        <div className={selectClasses.join(' ')}>
          <ul ref={SelectRef} className={styles.Items}>
            {items.map(item => (
              <li
                key={item.title}
                className={styles.Item}
                onClick={() => {
                  onChange?.(item);
                  closeSelect();
                }}>
                {item?.icon}
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;

import { FC, ReactElement, useState, useRef } from 'react';

import styles from './Select.module.css';
import useOutsideClickHandler from '../../../hooks/useOutsideClickHandler';

interface BaseItem {
  title: string;
  icon?: ReactElement | JSX.Element;
}

interface IProps<T> {
  items: Array<T>;
  /** @default  contained */
  variant?: 'outline' | 'contained';
  onChange?: (selectedItem: T) => void;
  /** @default readonly = false */
  readonly?: boolean;
  /** @default iconOnly = false */
  iconOnly?: boolean;
  defaultChecked?: T;
  value: T;
}

/**
 * @description Select component that renders a list of selectable items
 */

const Select = <T extends BaseItem>(props: IProps<T>) => {
  const {
    items,
    onChange,
    defaultChecked,
    value,
    readonly = false,
    variant = 'contained',
    iconOnly = false
  } = props;

  const selectRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openSelect = () => setIsOpen(true);
  const closeSelect = () => setIsOpen(false);

  const selectClasses = [styles.Select];
  const buttonClasses = [styles.Button];

  // If isOpen was true, add the Open class
  if (isOpen) selectClasses.push(styles.Open);

  if (variant === 'outline') buttonClasses.push(styles.Outline);

  // Close menu if clicked outside
  useOutsideClickHandler({ ref: selectRef, callback: closeSelect });

  return (
    <div className='relative'>
      <button className={buttonClasses.join(' ')} onClick={openSelect}>
        <span>{defaultChecked?.icon || value?.icon}</span>
        {(!iconOnly && defaultChecked?.title) ||
          (!iconOnly && <span>{value.title}</span>)}
      </button>
      {!readonly && (
        <div className={selectClasses.join(' ')}>
          <ul ref={selectRef} className={styles.Items}>
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

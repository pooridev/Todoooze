import { FC, ReactElement, useState, useRef } from "react";

import styles from "./Select.module.css";
import useOutsideClickHandler from "../../../hooks/useOutsideClickHandler";

interface Value<T> {
  title: T;
  icon?: ReactElement | JSX.Element;
}

interface IProps<T> {
  items: Array<Value<T>>;
  /** @default  contained */
  variant?: "outline" | "contained";
  onChange?: (selectedItem: T) => void;
  /** @default readonly = false */
  readonly?: boolean;
  /** @default iconOnly = false */
  iconOnly?: boolean;
  defaultValue?: Value<T>;
  value: Value<T>["title"];
}

const Select = <T extends string>(props: IProps<T>) => {
  const {
    items,
    onChange,
    defaultValue,
    value,
    readonly = false,
    variant = "contained",
    iconOnly = false,
  } = props;

  const selectRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openSelect = () => setIsOpen(true);
  const closeSelect = () => setIsOpen(false);

  const selectClasses = [styles.Select];
  const buttonClasses = [styles.Button];

  // If isOpen was true, add the Open class
  if (isOpen) selectClasses.push(styles.Open);

  if (variant === "outline") buttonClasses.push(styles.Outline);

  // Close menu if clicked outside
  useOutsideClickHandler({ ref: selectRef, callback: closeSelect });

  const valueWithIcon = items.find((i) => i.title == value) || null;

  return (
    <div className="relative">
      <button className={buttonClasses.join(" ")} onClick={openSelect}>
        <span>{valueWithIcon?.icon || defaultValue?.icon}</span>
        {(!iconOnly && <span>{valueWithIcon?.title}</span>) ||
          (!iconOnly && defaultValue?.title)}
      </button>
      {!readonly && (
        <div className={selectClasses.join(" ")}>
          <ul ref={selectRef} className={styles.Items}>
            {items.map((item) => (
              <li
                key={item.title}
                className={styles.Item}
                onClick={() => {
                  onChange?.(item.title);
                  closeSelect();
                }}
              >
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

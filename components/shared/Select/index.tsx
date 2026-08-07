"use client";
import { ReactElement, useState, useRef } from "react";

import styles from "./Select.module.css";
import useOutsideClickHandler from "../../../hooks/useOutsideClickHandler";

interface Value<T> {
  title: T;
  /** Display label; falls back to `title` when omitted. */
  label?: string;
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
  const { items, onChange, defaultValue, value, readonly = false, variant = "contained", iconOnly = false } = props;

  const selectRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openSelect = () => setIsOpen(true);
  const closeSelect = () => setIsOpen(false);

  const selectClasses = [styles.Select];
  const buttonClasses = [styles.Button];

  if (isOpen) selectClasses.push(styles.Open);
  if (variant === "outline") buttonClasses.push(styles.Outline);

  useOutsideClickHandler({ ref: selectRef, callback: closeSelect });

  const valueWithIcon = items.find((item) => item.title == value) || null;
  const displayLabel = valueWithIcon?.label || valueWithIcon?.title || defaultValue?.label || defaultValue?.title;

  return (
    <div className="relative">
      <button className={buttonClasses.join(" ")} onClick={openSelect} type="button">
        <span>{valueWithIcon?.icon || defaultValue?.icon}</span>
        {!iconOnly && <span>{displayLabel}</span>}
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
                <span>{item.label || item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;

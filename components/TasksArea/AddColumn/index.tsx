"use client";
import { FC, useState } from "react";

import { COLUMN_COLOR_PALETTE, newColumnId } from "../../../constants/columns";
import { useSetLists } from "../../../providers/Lists";
import { AddIcon } from "../../shared/Icon";
import styles from "./AddColumn.module.css";

type Props = {
  listId: string;
  nextColorIndex: number;
};

const AddColumn: FC<Props> = ({ listId, nextColorIndex }) => {
  const { addColumn } = useSetLists();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLUMN_COLOR_PALETTE[nextColorIndex % COLUMN_COLOR_PALETTE.length]);

  const reset = () => {
    setIsEditing(false);
    setName("");
    setColor(COLUMN_COLOR_PALETTE[nextColorIndex % COLUMN_COLOR_PALETTE.length]);
  };

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    addColumn({
      listId,
      id: newColumnId(),
      name: trimmed,
      color,
    });
    reset();
  };

  if (!isEditing) {
    return (
      <button className={styles.Trigger} type="button" onClick={() => setIsEditing(true)}>
        <AddIcon />
        Add column
      </button>
    );
  }

  return (
    <div className={styles.Form}>
      <input
        className={styles.Input}
        autoFocus
        placeholder="Column name"
        value={name}
        onChange={({ target }) => setName(target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") submit();
          if (event.key === "Escape") reset();
        }}
      />
      <div className={styles.ColorRow}>
        {COLUMN_COLOR_PALETTE.map((swatch) => (
          <button
            key={swatch}
            type="button"
            className={styles.ColorSwatch}
            style={{
              backgroundColor: swatch,
              outline: color === swatch ? "2px solid #fff" : "none",
            }}
            onClick={() => setColor(swatch)}
          />
        ))}
      </div>
      <div className={styles.Actions}>
        <button type="button" className={styles.Cancel} onClick={reset}>
          Cancel
        </button>
        <button type="button" className={styles.Submit} onClick={submit} disabled={!name.trim()}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddColumn;

"use client";
import { FC, useRef, useState } from "react";

import { AddIcon, DeleteIcon, ThreeDotsIcon } from "../../shared/Icon";
import NewTaskModal from "../TaskModal";
import Modal from "../../shared/Modal";
import { COLUMN_COLOR_PALETTE } from "../../../constants/columns";
import { ColumnType } from "../../../types/Column";
import { TaskType } from "../../../types/Task";
import { useSetLists } from "../../../providers/Lists";
import useOutsideClickHandler from "../../../hooks/useOutsideClickHandler";
import styles from "./ColumnHeader.module.css";

type ColumnHeaderProps = {
  listId: string;
  column: ColumnType & { items: TaskType[] };
  columnCount: number;
  fallbackColumnId: string;
  /** Spread onto the drag handle so the whole header can reorder columns. */
  dragHandleProps?: Record<string, unknown>;
};

const ColumnHeader: FC<ColumnHeaderProps> = ({
  listId,
  column,
  columnCount,
  fallbackColumnId,
  dragHandleProps,
}) => {
  const { updateColumn, deleteColumn } = useSetLists();

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(column.name);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const optionsButtonRef = useRef<HTMLButtonElement | null>(null);

  useOutsideClickHandler({ ref: menuRef, secondRef: optionsButtonRef, callback: () => setIsMenuOpen(false) });

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      return;
    }

    const rect = optionsButtonRef.current?.getBoundingClientRect();
    if (!rect) return;

    setMenuPosition({ top: rect.bottom + 4, left: Math.max(8, rect.right - 180) });
    setIsMenuOpen(true);
  };

  const commitRename = () => {
    const nextName = draftName.trim();
    setIsEditingName(false);

    if (!nextName || nextName === column.name) {
      setDraftName(column.name);
      return;
    }

    updateColumn({ listId, columnId: column.id, updates: { name: nextName } });
  };

  const deleteHandler = () => {
    deleteColumn({
      listId,
      columnId: column.id,
      moveTasksToColumnId: fallbackColumnId,
    });
    setIsDeleteOpen(false);
  };

  return (
    <>
      <header className={styles.StatusHeader} {...dragHandleProps} title="Drag to reorder column">
        <div className={styles.HeaderText}>
          <span className={styles.ColorDot} style={{ backgroundColor: column.color }} />
          {isEditingName ? (
            <input
              className={styles.NameInput}
              value={draftName}
              autoFocus
              onChange={({ target }) => setDraftName(target.value)}
              onBlur={commitRename}
              onKeyDown={(event) => {
                if (event.key === "Enter") commitRename();
                if (event.key === "Escape") {
                  setDraftName(column.name);
                  setIsEditingName(false);
                }
              }}
              // Don't start a column drag while renaming.
              onMouseDown={(event) => event.stopPropagation()}
            />
          ) : (
            <p
              title="Double-click to rename"
              onDoubleClick={() => {
                setDraftName(column.name);
                setIsEditingName(true);
              }}
            >
              {column.name}
            </p>
          )}
          <span
            className={styles.Count}
            style={{ backgroundColor: `${column.color}1f`, color: column.color }}
          >
            {column.items.length}
          </span>
        </div>

        <div className={styles.Actions} onMouseDown={(event) => event.stopPropagation()}>
          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            title="Add new task"
            className={styles.IconButton}
            type="button"
          >
            <AddIcon />
          </button>
          <button
            ref={optionsButtonRef}
            onClick={toggleMenu}
            title="Column options"
            className={styles.IconButton}
            type="button"
          >
            <ThreeDotsIcon />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.OptionsMenu} style={{ top: menuPosition.top, left: menuPosition.left }} ref={menuRef}>
          <button
            className={styles.OptionsMenuItem}
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              setDraftName(column.name);
              setIsEditingName(true);
            }}
          >
            Rename
          </button>

          <div className={styles.ColorRow}>
            {COLUMN_COLOR_PALETTE.map((color) => (
              <button
                key={color}
                type="button"
                title={color}
                className={styles.ColorSwatch}
                style={{
                  backgroundColor: color,
                  outline: column.color === color ? "2px solid #fff" : "none",
                }}
                onClick={() => {
                  updateColumn({ listId, columnId: column.id, updates: { color } });
                  setIsMenuOpen(false);
                }}
              />
            ))}
          </div>

          <button
            className={styles.OptionsMenuItemDanger}
            type="button"
            disabled={columnCount <= 1}
            onClick={() => {
              setIsMenuOpen(false);
              setIsDeleteOpen(true);
            }}
          >
            <DeleteIcon width="14" height="14" />
            Delete column
          </button>
        </div>
      )}

      <NewTaskModal
        columnId={column.id}
        listId={listId}
        toggle={setIsNewTaskModalOpen}
        isOpen={isNewTaskModalOpen}
      />

      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <Modal.Header toggle={setIsDeleteOpen} />
        <Modal.Body>
          <p className={styles.DeleteConfirmText}>
            Delete <strong>{column.name}</strong>
            {column.items.length > 0 &&
              ` and move its ${column.items.length} task${column.items.length > 1 ? "s" : ""} to another column`}
            ? This cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer toggle={setIsDeleteOpen} onSubmit={deleteHandler} submitLabel="Delete" />
      </Modal>
    </>
  );
};

export default ColumnHeader;

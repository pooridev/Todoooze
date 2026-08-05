"use client";
import { FC, useRef, useState } from "react";
import Link from "next/link";

import styles from "./Lists.module.css";
import { ArrowRight, DeleteIcon, ThreeDotsIcon, WritingIcon } from "../../shared/Icon";
import { ListType } from "../../../types/ListType";

import { useLists, useSetLists } from "../../../providers/Lists";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import useOutsideClickHandler from "../../../hooks/useOutsideClickHandler";
import ListModal from "../ListModal";
import Modal from "../../shared/Modal";

const Lists: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const lists = useLists();

  const listsArr = Object.entries(lists);

  const toggleListsDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.ListsWrapper}>
      <header
        className={classNames(styles.Header, { [styles.ListDropDownOpen]: isOpen })}
        onClick={toggleListsDropdown}
      >
        <h3 className="flex justify-between">
          Your Lists
          <ArrowRight className={classNames(isOpen && styles.RotateArrow)} />
        </h3>
      </header>
      <ul className={classNames(styles.Lists, isOpen && styles.Open)}>
        {listsArr.map(([listId, list]) => (
          <ProjectListItem list={list} key={listId} />
        ))}
        {listsArr.length === 0 && <li className={styles.EmptyState}>No lists yet — create one above.</li>}
      </ul>
    </div>
  );
};

const ProjectListItem = ({ list }: { list: ListType }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { deleteList } = useSetLists();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const optionsButtonRef = useRef<HTMLButtonElement | null>(null);

  useOutsideClickHandler({ ref: menuRef, secondRef: optionsButtonRef, callback: () => setIsMenuOpen(false) });

  const isLinkActive = (_pathname: string) => pathname == _pathname;

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      return;
    }

    const rect = optionsButtonRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Position the menu relative to the viewport (position: fixed) so it can't
    // be clipped by the animated overflow-hidden list container.
    const MENU_WIDTH = 128;
    const MENU_HEIGHT = 76;
    const opensUpward = rect.bottom + MENU_HEIGHT > window.innerHeight;

    setMenuPosition({
      top: opensUpward ? rect.top - MENU_HEIGHT - 4 : rect.bottom + 4,
      left: Math.max(8, rect.right - MENU_WIDTH),
    });
    setIsMenuOpen(true);
  };

  const deleteListHandler = () => {
    deleteList({ listId: list.id });
    setIsDeleteModalOpen(false);

    // Don't leave the user staring at a board that no longer exists.
    if (isLinkActive(`/list/${list.id}`)) router.push("/");
  };

  const taskCount = list.tasks.length;

  return (
    <li key={list.id} className={styles.List}>
      <span className={classNames(styles.Title, { [styles.ActiveLink]: isLinkActive(`/list/${list.id}`) })}>
        <Link href={`/list/${list.id}`} className="flex-grow" passHref>
          {list.title}
        </Link>
        <span className={styles.TaskCount}>{taskCount}</span>
        <button ref={optionsButtonRef} className={styles.OpenOptionsButton} title="List options" onClick={toggleMenu}>
          <ThreeDotsIcon />
        </button>
      </span>

      {isMenuOpen && (
        <div className={styles.OptionsMenu} style={{ top: menuPosition.top, left: menuPosition.left }} ref={menuRef}>
          <button
            className={styles.OptionsMenuItem}
            onClick={() => {
              setIsMenuOpen(false);
              setIsRenameModalOpen(true);
            }}
          >
            <WritingIcon width="16" height="16" />
            Edit
          </button>
          <button
            className={styles.OptionsMenuItem}
            onClick={() => {
              setIsMenuOpen(false);
              setIsDeleteModalOpen(true);
            }}
          >
            <DeleteIcon width="16" height="16" />
            Delete
          </button>
        </div>
      )}

      {isRenameModalOpen && <ListModal isOpen list={list} toggle={setIsRenameModalOpen} />}

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <Modal.Header toggle={setIsDeleteModalOpen} />
        <Modal.Body>
          <p className={styles.DeleteConfirmText}>
            Delete <strong>{list.title}</strong>
            {taskCount > 0 && ` and its ${taskCount} task${taskCount > 1 ? "s" : ""}`}? This cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer toggle={setIsDeleteModalOpen} onSubmit={deleteListHandler} submitLabel="Delete" />
      </Modal>
    </li>
  );
};

export default Lists;

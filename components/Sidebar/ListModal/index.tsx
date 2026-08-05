"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import styles from "./ListModal.module.css";
import Modal from "../../shared/Modal";
import { useSetLists } from "../../../providers/Lists";
import { ListType } from "../../../types/ListType";

interface Props {
  isOpen: boolean;
  toggle: (state: boolean) => void;
  /** When provided, the modal edits this list instead of creating a new one. */
  list?: ListType;
}

const ListModal = ({ isOpen, toggle, list }: Props) => {
  const router = useRouter();
  const { addList, updateList } = useSetLists();

  const isEditMode = Boolean(list);

  const [title, setTitle] = useState(list?.title ?? "");
  const [description, setDescription] = useState(list?.description ?? "");
  const [error, setError] = useState<string | null>(null);

  const closeModal = () => {
    setTitle(list?.title ?? "");
    setDescription(list?.description ?? "");
    setError(null);
    toggle(false);
  };

  const submitHandler = () => {
    if (!title.trim()) {
      setError("List name is required");
      return;
    }

    if (isEditMode && list) {
      updateList({ listId: list.id, title: title.trim(), description: description.trim() });
      closeModal();
      return;
    }

    const id = uuidv4();
    addList({ id, title: title.trim(), description: description.trim() });
    closeModal();
    setTitle("");
    setDescription("");
    router.push(`/list/${id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Header toggle={closeModal} />
      <Modal.Body>
        <div className={styles.Content}>
          <input
            type="text"
            autoFocus
            value={title}
            onChange={({ target }) => {
              setError(null);
              setTitle(target.value);
            }}
            onKeyDown={(event) => event.key === "Enter" && submitHandler()}
            className={styles.Title}
            placeholder="List name"
            title="List name"
          />
          <textarea
            value={description}
            placeholder="What is this list about?"
            onChange={({ target }) => setDescription(target.value)}
            className={styles.Description}
          />
          {error && <p className={styles.Error}>{error}</p>}
        </div>
      </Modal.Body>
      <Modal.Footer toggle={closeModal} onSubmit={submitHandler} submitLabel={isEditMode ? "Save changes" : "Create list"} />
    </Modal>
  );
};

export default ListModal;

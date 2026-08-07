"use client";
import { useMemo, useState } from "react";

import Navbar from "../../components/shared/Navbar/Navbar";
import TaskRow from "../../components/shared/TaskRow";
import { SearchIcon } from "../../components/shared/Icon";
import { useLists } from "../../providers/Lists";
import { TaskType } from "../../types/Task";
import { ColumnType } from "../../types/Column";

import styles from "./Search.module.css";

type SearchResult = {
  task: TaskType;
  listId: string;
  listTitle: string;
  column?: ColumnType;
};

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const lists = useLists();

  const results = useMemo<SearchResult[]>(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];

    return Object.values(lists).flatMap((list) =>
      list.tasks
        .filter(
          (task) =>
            task.title.toLowerCase().includes(needle) || task.description?.toLowerCase().includes(needle)
        )
        .map((task) => ({
          task,
          listId: list.id,
          listTitle: list.title,
          column: list.columns.find((column) => column.id === task.columnId),
        }))
    );
  }, [query, lists]);

  const hasQuery = query.trim().length > 0;

  return (
    <>
      <Navbar>
        <h2 className={styles.Title}>Search</h2>
      </Navbar>
      <div className={styles.Scroll}>
        <div className={styles.Search}>
          <div className={styles.InputWrapper}>
            <SearchIcon className={styles.InputIcon} />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={({ target }) => setQuery(target.value)}
              placeholder="Search tasks by title or description..."
              className={styles.Input}
            />
          </div>

          {hasQuery && (
            <p className={styles.ResultCount}>
              {results.length} result{results.length !== 1 && "s"}
            </p>
          )}

          <div className={styles.Results}>
            {results.map(({ task, listId, listTitle, column }) => (
              <TaskRow
                key={task.id}
                task={task}
                listId={listId}
                listTitle={listTitle}
                column={column}
                highlight={query}
              />
            ))}
          </div>

          {!hasQuery && <p className={styles.EmptyState}>Start typing to search across all your lists.</p>}
          {hasQuery && results.length === 0 && (
            <p className={styles.EmptyState}>No tasks match &quot;{query.trim()}&quot;.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;

"use client";
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { createDefaultColumns, SEED_COLUMNS } from "../constants/columns";
import { migrateLists } from "../helpers/migrate-lists";
import { ColumnType } from "../types/Column";
import { ListType } from "../types/ListType";
import { TaskPriority, TaskType } from "../types/Task";

const STORAGE_KEY = "todoooze.lists.v1";

interface ListsContextType {
  Lists: Lists;
  /** False until persisted data has been loaded from localStorage after mount. */
  isHydrated: boolean;
  actions: {
    addNewTask: (payload: AddNewTaskPayload) => void;
    deleteTask: (payload: DeleteTaskPayload) => void;
    updateTask: (payload: UpdateTaskPayload) => void;
    updateTaskColumn: (payload: UpdateTaskColumnPayload) => void;
    updateTaskPriority: (payload: UpdateTaskPriority) => void;
    moveTask: (payload: MoveTaskPayload) => void;
    addList: (payload: AddListPayload) => void;
    updateList: (payload: UpdateListPayload) => void;
    deleteList: (payload: DeleteListPayload) => void;
    addColumn: (payload: AddColumnPayload) => void;
    updateColumn: (payload: UpdateColumnPayload) => void;
    deleteColumn: (payload: DeleteColumnPayload) => void;
    reorderColumns: (payload: ReorderColumnsPayload) => void;
  };
}

export interface Lists {
  [listId: string]: ListType;
}

const now = Date.now();

const list1Id = uuidv4();
const list2Id = uuidv4();

const initialLists: Lists = {
  [list1Id]: {
    id: list1Id,
    title: "Snappfood",
    description: "A leading delivery service in Iran!",
    columns: SEED_COLUMNS,
    tasks: [
      {
        title: "Implement Foodstory uploader",
        id: "1",
        columnId: "col-done",
        priority: "Medium",
        createdAt: now,
        updatedAt: now,
      },
    ],
  },
  [list2Id]: {
    id: list2Id,
    title: "Digikala.com",
    description: "A leading Ecommerce in Iran!",
    columns: SEED_COLUMNS.map((column) => ({ ...column })),
    tasks: [
      {
        title: "Implement RoundTable wizard component",
        id: "2",
        columnId: "col-progress",
        priority: "Urgent",
        createdAt: now,
        updatedAt: now,
      },
    ],
  },
};

export interface AddNewTaskPayload {
  listId: string;
  title: string;
  description: string;
  id: string;
  columnId: string;
  priority: TaskPriority;
}

export interface DeleteTaskPayload {
  listId: string;
  taskId: string;
}

export interface UpdateTaskPayload {
  listId: string;
  taskId: string;
  updates: Partial<Pick<TaskType, "title" | "description" | "columnId" | "priority">>;
}

export interface UpdateTaskColumnPayload {
  listId: string;
  taskId: string;
  columnId: string;
}

export interface UpdateTaskPriority {
  listId: string;
  taskId: string;
  newPriority: TaskPriority;
}

export interface MoveTaskPayload {
  listId: string;
  taskId: string;
  columnId: string;
  /** Position among the tasks of the destination column. */
  destinationIndex: number;
}

export interface AddListPayload {
  id: string;
  title: string;
  description: string;
}

export interface UpdateListPayload {
  listId: string;
  title: string;
  description: string;
}

export interface DeleteListPayload {
  listId: string;
}

export interface AddColumnPayload {
  listId: string;
  id: string;
  name: string;
  color: string;
}

export interface UpdateColumnPayload {
  listId: string;
  columnId: string;
  updates: Partial<Pick<ColumnType, "name" | "color">>;
}

export interface DeleteColumnPayload {
  listId: string;
  columnId: string;
  /** Tasks in the deleted column are moved here. */
  moveTasksToColumnId: string;
}

export interface ReorderColumnsPayload {
  listId: string;
  sourceIndex: number;
  destinationIndex: number;
}

export type ListAction =
  | { type: "HYDRATE"; payload: Lists }
  | { type: "ADD_NEW_TASK"; payload: AddNewTaskPayload }
  | { type: "DELETE_TASK"; payload: DeleteTaskPayload }
  | { type: "UPDATE_TASK"; payload: UpdateTaskPayload }
  | { type: "MOVE_TASK"; payload: MoveTaskPayload }
  | { type: "ADD_LIST"; payload: AddListPayload }
  | { type: "UPDATE_LIST"; payload: UpdateListPayload }
  | { type: "DELETE_LIST"; payload: DeleteListPayload }
  | { type: "ADD_COLUMN"; payload: AddColumnPayload }
  | { type: "UPDATE_COLUMN"; payload: UpdateColumnPayload }
  | { type: "DELETE_COLUMN"; payload: DeleteColumnPayload }
  | { type: "REORDER_COLUMNS"; payload: ReorderColumnsPayload };

const updateTaskInList = (list: ListType, taskId: string, updates: Partial<TaskType>): ListType => ({
  ...list,
  tasks: list.tasks.map((task) => (task.id === taskId ? { ...task, ...updates, updatedAt: Date.now() } : task)),
});

export const listsReducer = (state: Lists, action: ListAction): Lists => {
  switch (action.type) {
    case "HYDRATE": {
      return action.payload;
    }

    case "ADD_NEW_TASK": {
      const { listId, ...taskPayload } = action.payload;
      const list = state[listId];

      if (!list) return state;

      const timestamp = Date.now();
      const newTask: TaskType = { ...taskPayload, createdAt: timestamp, updatedAt: timestamp };

      return {
        ...state,
        [listId]: { ...list, tasks: [...list.tasks, newTask] },
      };
    }

    case "DELETE_TASK": {
      const { listId, taskId } = action.payload;
      const list = state[listId];

      if (!list) return state;

      return {
        ...state,
        [listId]: { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) },
      };
    }

    case "UPDATE_TASK": {
      const { listId, taskId, updates } = action.payload;
      const list = state[listId];

      if (!list) return state;

      return {
        ...state,
        [listId]: updateTaskInList(list, taskId, updates),
      };
    }

    case "MOVE_TASK": {
      const { listId, taskId, columnId, destinationIndex } = action.payload;
      const list = state[listId];

      if (!list) return state;

      const tasks = [...list.tasks];
      const sourceIndex = tasks.findIndex((task) => task.id === taskId);

      if (sourceIndex === -1) return state;

      const [moved] = tasks.splice(sourceIndex, 1);
      const movedTask: TaskType = { ...moved, columnId, updatedAt: Date.now() };

      const destinationIndexes = tasks.reduce<number[]>(
        (indexes, task, index) => (task.columnId === columnId ? [...indexes, index] : indexes),
        []
      );

      const insertAt =
        destinationIndex < destinationIndexes.length
          ? destinationIndexes[destinationIndex]
          : destinationIndexes.length > 0
            ? destinationIndexes[destinationIndexes.length - 1] + 1
            : tasks.length;

      tasks.splice(insertAt, 0, movedTask);

      return {
        ...state,
        [listId]: { ...list, tasks },
      };
    }

    case "ADD_LIST": {
      const { id, title, description } = action.payload;

      return {
        ...state,
        [id]: { id, title, description, columns: createDefaultColumns(), tasks: [] },
      };
    }

    case "UPDATE_LIST": {
      const { listId, title, description } = action.payload;
      const list = state[listId];

      if (!list) return state;

      return {
        ...state,
        [listId]: { ...list, title, description },
      };
    }

    case "DELETE_LIST": {
      const { listId } = action.payload;

      if (!state[listId]) return state;

      const { [listId]: _removed, ...rest } = state;
      return rest;
    }

    case "ADD_COLUMN": {
      const { listId, id, name, color } = action.payload;
      const list = state[listId];

      if (!list) return state;

      return {
        ...state,
        [listId]: {
          ...list,
          columns: [...list.columns, { id, name, color }],
        },
      };
    }

    case "UPDATE_COLUMN": {
      const { listId, columnId, updates } = action.payload;
      const list = state[listId];

      if (!list) return state;

      return {
        ...state,
        [listId]: {
          ...list,
          columns: list.columns.map((column) => (column.id === columnId ? { ...column, ...updates } : column)),
        },
      };
    }

    case "DELETE_COLUMN": {
      const { listId, columnId, moveTasksToColumnId } = action.payload;
      const list = state[listId];

      if (!list) return state;
      if (list.columns.length <= 1) return state;
      if (!list.columns.some((column) => column.id === moveTasksToColumnId)) return state;

      return {
        ...state,
        [listId]: {
          ...list,
          columns: list.columns.filter((column) => column.id !== columnId),
          tasks: list.tasks.map((task) =>
            task.columnId === columnId
              ? { ...task, columnId: moveTasksToColumnId, updatedAt: Date.now() }
              : task
          ),
        },
      };
    }

    case "REORDER_COLUMNS": {
      const { listId, sourceIndex, destinationIndex } = action.payload;
      const list = state[listId];

      if (!list) return state;
      if (sourceIndex === destinationIndex) return state;
      if (
        sourceIndex < 0 ||
        destinationIndex < 0 ||
        sourceIndex >= list.columns.length ||
        destinationIndex >= list.columns.length
      ) {
        return state;
      }

      const columns = [...list.columns];
      const [moved] = columns.splice(sourceIndex, 1);
      columns.splice(destinationIndex, 0, moved);

      return {
        ...state,
        [listId]: { ...list, columns },
      };
    }

    default: {
      return state;
    }
  }
};

const readStoredLists = (): Lists | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    return migrateLists(parsed);
  } catch {
    return null;
  }
};

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const ListsProvider = ({ children }: PropsWithChildren) => {
  const [Lists, dispatch] = useReducer(listsReducer, initialLists);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredLists();
    if (stored) dispatch({ type: "HYDRATE", payload: stored });

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Lists));
    } catch {
      // Storage may be unavailable; the app still works in-memory.
    }
  }, [Lists, isHydrated]);

  const contextValue = useMemo(
    () => ({
      Lists,
      isHydrated,
      actions: {
        addNewTask: (payload: AddNewTaskPayload) => dispatch({ type: "ADD_NEW_TASK", payload }),
        deleteTask: (payload: DeleteTaskPayload) => dispatch({ type: "DELETE_TASK", payload }),
        updateTask: (payload: UpdateTaskPayload) => dispatch({ type: "UPDATE_TASK", payload }),
        updateTaskColumn: ({ listId, taskId, columnId }: UpdateTaskColumnPayload) =>
          dispatch({ type: "UPDATE_TASK", payload: { listId, taskId, updates: { columnId } } }),
        updateTaskPriority: ({ listId, taskId, newPriority }: UpdateTaskPriority) =>
          dispatch({ type: "UPDATE_TASK", payload: { listId, taskId, updates: { priority: newPriority } } }),
        moveTask: (payload: MoveTaskPayload) => dispatch({ type: "MOVE_TASK", payload }),
        addList: (payload: AddListPayload) => dispatch({ type: "ADD_LIST", payload }),
        updateList: (payload: UpdateListPayload) => dispatch({ type: "UPDATE_LIST", payload }),
        deleteList: (payload: DeleteListPayload) => dispatch({ type: "DELETE_LIST", payload }),
        addColumn: (payload: AddColumnPayload) => dispatch({ type: "ADD_COLUMN", payload }),
        updateColumn: (payload: UpdateColumnPayload) => dispatch({ type: "UPDATE_COLUMN", payload }),
        deleteColumn: (payload: DeleteColumnPayload) => dispatch({ type: "DELETE_COLUMN", payload }),
        reorderColumns: (payload: ReorderColumnsPayload) => dispatch({ type: "REORDER_COLUMNS", payload }),
      },
    }),
    [Lists, isHydrated]
  );

  return <ListsContext.Provider value={contextValue}>{children}</ListsContext.Provider>;
};

export const useLists = () => {
  const state = useContext(ListsContext);

  if (!state) {
    throw new Error("You must wrap your consumers around <ListsContext.Provider /> ");
  }

  return state.Lists;
};

export const useSetLists = () => {
  const state = useContext(ListsContext);

  if (!state) {
    throw new Error("You must wrap your consumers around <ListsContext.Provider /> ");
  }

  return state.actions;
};

export const useListsHydrated = () => {
  const state = useContext(ListsContext);

  if (!state) {
    throw new Error("You must wrap your consumers around <ListsContext.Provider /> ");
  }

  return state.isHydrated;
};

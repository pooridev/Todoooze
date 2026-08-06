"use client";
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { TaskPriority, TaskStatus, TaskType } from "../types/Task";
import { ListType } from "../types/ListType";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "todoooze.lists.v1";

interface ListsContextType {
  Lists: Lists;
  /** False until persisted data has been loaded from localStorage after mount. */
  isHydrated: boolean;
  actions: {
    addNewTask: (payload: AddNewTaskPayload) => void;
    deleteTask: (payload: DeleteTaskPayload) => void;
    updateTask: (payload: UpdateTaskPayload) => void;
    updateTaskStatus: (payload: UpdateTaskStatusPayload) => void;
    updateTaskPriority: (payload: UpdateTaskPriority) => void;
    moveTask: (payload: MoveTaskPayload) => void;
    addList: (payload: AddListPayload) => void;
    updateList: (payload: UpdateListPayload) => void;
    deleteList: (payload: DeleteListPayload) => void;
  };
}

export interface Lists {
  [listId: string]: ListType;
}

const now = Date.now();

const list1Id = uuidv4();
const list2Id = uuidv4();

const initialLists: Lists = {
  //👇🏼 List id
  [list1Id]: {
    id: list1Id,
    title: "Snappfood",
    description: "A leading delivery service in Iran!",
    tasks: [
      {
        title: "Implement Foodstory uploader",
        id: "1",
        status: "Done",
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
    tasks: [
      {
        title: "Implement RoundTable wizard component",
        id: "2",
        status: "In Progress",
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
  status: TaskStatus;
  priority: TaskPriority;
}

export interface DeleteTaskPayload {
  listId: string;
  taskId: string;
}

export interface UpdateTaskPayload {
  listId: string;
  taskId: string;
  updates: Partial<Pick<TaskType, "title" | "description" | "status" | "priority">>;
}

export interface UpdateTaskStatusPayload {
  listId: string;
  taskId: string;
  newStatus: TaskStatus;
}

export interface UpdateTaskPriority {
  listId: string;
  taskId: string;
  newPriority: TaskPriority;
}

export interface MoveTaskPayload {
  listId: string;
  taskId: string;
  newStatus: TaskStatus;
  /** Position among the tasks of `newStatus` (i.e. the index within the destination column). */
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

export type ListAction =
  | { type: "HYDRATE"; payload: Lists }
  | { type: "ADD_NEW_TASK"; payload: AddNewTaskPayload }
  | { type: "DELETE_TASK"; payload: DeleteTaskPayload }
  | { type: "UPDATE_TASK"; payload: UpdateTaskPayload }
  | { type: "MOVE_TASK"; payload: MoveTaskPayload }
  | { type: "ADD_LIST"; payload: AddListPayload }
  | { type: "UPDATE_LIST"; payload: UpdateListPayload }
  | { type: "DELETE_LIST"; payload: DeleteListPayload };

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
      const { listId, taskId, newStatus, destinationIndex } = action.payload;
      const list = state[listId];

      if (!list) return state;

      const tasks = [...list.tasks];
      const sourceIndex = tasks.findIndex((task) => task.id === taskId);

      if (sourceIndex === -1) return state;

      const [moved] = tasks.splice(sourceIndex, 1);
      const movedTask: TaskType = { ...moved, status: newStatus, updatedAt: Date.now() };

      // Tasks are stored in a single array per list; a column is the ordered
      // subset of tasks sharing a status. To drop the task at `destinationIndex`
      // of its destination column we translate that column-relative index into
      // an index of the underlying array.
      const destinationStatusIndexes = tasks.reduce<number[]>(
        (indexes, task, index) => (task.status === newStatus ? [...indexes, index] : indexes),
        []
      );

      const insertAt =
        destinationIndex < destinationStatusIndexes.length
          ? destinationStatusIndexes[destinationIndex]
          : destinationStatusIndexes.length > 0
            ? destinationStatusIndexes[destinationStatusIndexes.length - 1] + 1
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
        [id]: { id, title, description, tasks: [] },
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

    return parsed as Lists;
  } catch {
    // Corrupted storage should never take the app down; fall back to seed data.
    return null;
  }
};

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const ListsProvider = ({ children }: PropsWithChildren) => {
  const [Lists, dispatch] = useReducer(listsReducer, initialLists);

  // Hydrate from localStorage after mount (not during render) so the first
  // client render matches the server-rendered markup.
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredLists();
    if (stored) dispatch({ type: "HYDRATE", payload: stored });

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Don't overwrite storage with seed data before hydration has happened.
    if (!isHydrated) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Lists));
    } catch {
      // Storage may be unavailable (private mode, quota); the app still works in-memory.
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
        updateTaskStatus: ({ listId, taskId, newStatus }: UpdateTaskStatusPayload) =>
          dispatch({ type: "UPDATE_TASK", payload: { listId, taskId, updates: { status: newStatus } } }),
        updateTaskPriority: ({ listId, taskId, newPriority }: UpdateTaskPriority) =>
          dispatch({ type: "UPDATE_TASK", payload: { listId, taskId, updates: { priority: newPriority } } }),
        moveTask: (payload: MoveTaskPayload) => dispatch({ type: "MOVE_TASK", payload }),
        addList: (payload: AddListPayload) => dispatch({ type: "ADD_LIST", payload }),
        updateList: (payload: UpdateListPayload) => dispatch({ type: "UPDATE_LIST", payload }),
        deleteList: (payload: DeleteListPayload) => dispatch({ type: "DELETE_LIST", payload }),
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

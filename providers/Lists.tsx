import { Dispatch, PropsWithChildren, createContext, useContext, useMemo, useReducer } from "react";
import { TaskPriority, TaskStatus, TaskType } from "../types/Task";

interface ListsContextType {
  Lists: Lists;
  actions: {
    addNewTask: (payload: AddNewTaskPayload) => void;
    deleteTask: (payload: DeleteTaskPayload) => void;
    updateTaskStatus: (payload: UpdateTaskStatusPayload) => void;
    updateTaskPriority: (payload: UpdateTaskPriority) => void;
  };
}

interface Lists {
  [listId: string]: {
    id: string;
    title: string;
    description: string;
    tasks: TaskType[];
  };
}

const initialLists: Lists = {
  //👇🏼 List id
  "1": {
    id: "1",
    title: "Snappfood",
    description: "A leading delivery service in Iran!",
    tasks: [
      {
        title: "Implement Foodstory uploader",
        id: "1",
        status: "Done",
        priority: "Medium",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Digikala.com",
    description: "A leading Ecommerce in Iran!",
    tasks: [
      {
        title: "Implement RoundTable wizard component",
        id: "2",
        status: "In Progress",
        priority: "Urgent",
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

export type ListAction =
  | {
      type: "ADD_NEW_TASK";
      payload: AddNewTaskPayload;
    }
  | {
      type: "DELETE_TASK";
      payload: DeleteTaskPayload;
    }
  | {
      type: "UPDATE_TASK_STATUS";
      payload: UpdateTaskStatusPayload;
    }
  | {
      type: "UPDATE_TASK_PRIORITY";
      payload: UpdateTaskPriority;
    };

const listsReducer = (state: Lists, action: ListAction): Lists => {
  switch (action.type) {
    case "ADD_NEW_TASK": {
      const { listId, ...taskPayload } = action.payload;

      const newLists = structuredClone(state);

      newLists[listId] = {
        ...newLists[listId],
        tasks: [...(newLists[listId]?.tasks || []), taskPayload],
      };

      return newLists;
    }

    case "UPDATE_TASK_PRIORITY": {
      const { listId, newPriority, taskId } = action.payload;

      const newLists = structuredClone(state);

      const updatedTasks = newLists[listId].tasks.map((task) => {
        // Did match?
        // updated its priority
        if (task.id === taskId) {
          task.priority = newPriority;
        }

        return task;
      });

      newLists[listId] = {
        ...newLists[listId],
        tasks: updatedTasks,
      };

      return newLists;
    }

    case "UPDATE_TASK_STATUS": {
      const { taskId, listId, newStatus } = action.payload;

      const newLists = structuredClone(state);

      const updatedTasks = newLists[listId].tasks.map((task) => {
        // Did match?
        // updated its status
        if (task.id === taskId) {
          task.status = newStatus;
        }

        return task;
      });

      newLists[listId] = {
        ...newLists[listId],
        tasks: updatedTasks,
      };

      return newLists;
    }

    default: {
      console.warn(`
      Should not reach here!
      you probebly passed wrong action here!

      PASSED ACTION TYPE: ${action.type}
      PASSED ACTION PAYLOAD: ${JSON.stringify(action.payload, null, 2)}
    `);
      return state;
    }
  }
};

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const ListsProvider = ({ children }: PropsWithChildren) => {
  const [Lists, dispatch] = useReducer(listsReducer, initialLists);

  const addNewTask = (payload: AddNewTaskPayload) => {
    dispatch({
      type: "ADD_NEW_TASK",
      payload,
    });
  };

  const deleteTask = (payload: DeleteTaskPayload) => {
    dispatch({
      type: "DELETE_TASK",
      payload,
    });
  };

  const updateTaskStatus = (payload: UpdateTaskStatusPayload) => {
    dispatch({
      type: "UPDATE_TASK_STATUS",
      payload,
    });
  };

  const updateTaskPriority = (payload: UpdateTaskPriority) => {
    dispatch({
      type: "UPDATE_TASK_PRIORITY",
      payload,
    });
  };

  const contextValue = useMemo(
    () => ({
      Lists,
      actions: {
        addNewTask,
        deleteTask,
        updateTaskPriority,
        updateTaskStatus,
      },
    }),
    [Lists]
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

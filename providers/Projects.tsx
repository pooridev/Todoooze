import { Dispatch, PropsWithChildren, createContext, useContext, useMemo, useReducer } from "react";
import { TaskPriority, TaskStatus, TaskType } from "../types/Task";

interface ProjectsContextType {
  projects: Projects;
  actions: {
    addNewTask: (payload: AddNewTaskPayload) => void;
    deleteTask: (payload: DeleteTaskPayload) => void;
    updateTaskStatus: (payload: UpdateTaskStatusPayload) => void;
    updateTaskPriority: (payload: UpdateTaskPriority) => void;
  };
}

interface Projects {
  [projectId: string]: {
    id: string;
    title: string;
    description: string;
    tasks: TaskType[];
  };
}

const initialProjects: Projects = {
  //👇🏼 Proejct id
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
  projectId: string;
  title: string;
  description: string;
  id: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface DeleteTaskPayload {
  projectId: string;
  taskId: string;
}

export interface UpdateTaskStatusPayload {
  projectId: string;
  taskId: string;
  newStatus: TaskStatus;
}

export interface UpdateTaskPriority {
  projectId: string;
  taskId: string;
  newPriority: TaskPriority;
}

export type ProjectAction =
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

const projectsReducer = (state: Projects, action: ProjectAction): Projects => {
  switch (action.type) {
    case "ADD_NEW_TASK": {
      const { projectId, ...taskPayload } = action.payload;

      const newProjects = structuredClone(state);

      newProjects[projectId] = {
        ...newProjects[projectId],
        tasks: [...(newProjects[projectId]?.tasks || []), taskPayload],
      };

      return newProjects;
    }

    case "UPDATE_TASK_PRIORITY": {
      const { projectId, newPriority, taskId } = action.payload;

      const newProjects = structuredClone(state);

      const updatedTasks = newProjects[projectId].tasks.map((task) => {
        // Did match?
        // updated its priority
        if (task.id === taskId) {
          task.priority = newPriority;
        }

        return task;
      });

      newProjects[projectId] = {
        ...newProjects[projectId],
        tasks: updatedTasks,
      };

      return newProjects;
    }

    case "UPDATE_TASK_STATUS": {
      const { taskId, projectId, newStatus } = action.payload;

      const newProjects = structuredClone(state);

      const updatedTasks = newProjects[projectId].tasks.map((task) => {
        // Did match?
        // updated its priority
        if (task.id === taskId) {
          task.status = newStatus;
        }

        return task;
      });

      newProjects[projectId] = {
        ...newProjects[projectId],
        tasks: updatedTasks,
      };

      return newProjects;
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

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: PropsWithChildren) => {
  const [projects, dispatch] = useReducer(projectsReducer, initialProjects);

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
      projects,
      actions: {
        addNewTask,
        deleteTask,
        updateTaskPriority,
        updateTaskStatus,
      },
    }),
    [projects]
  );

  return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
};

export const useProjects = () => {
  const state = useContext(ProjectsContext);

  if (!state) {
    throw new Error("You must wrap your consumers around <ProjectsContext.Provider /> ");
  }

  return state.projects;
};

export const useSetProjects = () => {
  const state = useContext(ProjectsContext);

  if (!state) {
    throw new Error("You must wrap your consumers around <ProjectsContext.Provider /> ");
  }

  return state.actions;
};

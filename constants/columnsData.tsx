import { v4 as uuidv4 } from "uuid";

import {
  TodoIcon,
  InProgressIcon,
  InReviewIcon,
  DoneIcon,
} from "../components/shared/Icon";
import { TaskType } from "../types/Task";

export type Columns = {
  [key: string]: {
    name: "Todo" | "In Progress" | "In Review" | "Done";
    icon: JSX.Element;
    items: Array<TaskType>;
  };
};

export const columnsData: Columns = {
  [uuidv4()]: {
    name: "Todo",
    icon: <TodoIcon />,
    items: [],
  },
  [uuidv4()]: {
    name: "In Progress",
    icon: <InProgressIcon />,
    items: [],
  },
  [uuidv4()]: {
    name: "In Review",
    icon: <InReviewIcon />,
    items: [],
  },
  [uuidv4()]: {
    name: "Done",
    icon: <DoneIcon />,
    items: [],
  },
};

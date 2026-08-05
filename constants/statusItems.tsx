import { DoneIcon, InProgressIcon, InReviewIcon, TodoIcon } from "../components/shared/Icon";
import { TaskStatus } from "../types/Task";

export const statusColors: Record<TaskStatus, string> = {
  Todo: "#8a8f98",
  "In Progress": "#f2c94c",
  "In Review": "#5e6ad2",
  Done: "#4cb782",
};

export const statusItems: {
  title: TaskStatus;
  icon: JSX.Element;
}[] = [
  {
    title: "Todo",
    icon: <TodoIcon />,
  },
  {
    title: "In Progress",
    icon: <InProgressIcon />,
  },
  {
    title: "In Review",
    icon: <InReviewIcon />,
  },
  {
    title: "Done",
    icon: <DoneIcon />,
  },
];

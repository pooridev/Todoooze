import {
  DoneIcon,
  InProgressIcon,
  InReviewIcon,
  TodoIcon,
} from "../components/shared/Icon";
import { TaskStatus } from "../types/Task";

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

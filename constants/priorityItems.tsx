import {
  HighIcon,
  LowIcon,
  MediumIcon,
  UrgentIcon,
} from "../components/shared/Icon";
import { TaskPriority, TaskStatus } from "../types/Task";

export const priorityItems: { title: TaskPriority; icon: JSX.Element }[] = [
  {
    title: "Urgent",
    icon: <UrgentIcon />,
  },
  {
    title: "High",
    icon: <HighIcon />,
  },
  {
    title: "Medium",
    icon: <MediumIcon />,
  },
  {
    title: "Low",
    icon: <LowIcon />,
  },
];

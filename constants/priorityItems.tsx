import { HighIcon, LowIcon, MediumIcon, UrgentIcon } from "../components/shared/Icon";
import { TaskPriority } from "../types/Task";

export const priorityColors: Record<TaskPriority, string> = {
  Priority: "#8a8f98",
  Urgent: "#eb5757",
  High: "#f2994a",
  Medium: "#f2c94c",
  Low: "#8a8f98",
};

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

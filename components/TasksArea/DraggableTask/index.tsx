import { FC, ReactElement } from "react";
import Image from "next/image";
import { Draggable } from "react-beautiful-dnd-next";
import * as ReactContextMenu from "@radix-ui/react-context-menu";

import styles from "./styles.module.css";
import userAvatar from "../../../assets/images/avatar.jpg";
import { TaskPriority, TaskStatus, TaskType } from "../../../types/Task";
import ContextMenu from "./ContextMenu";
import Select from "../../shared/Select";
import { statusItems } from "../../../constants/statusItems";
import { priorityItems } from "../../../constants/priorityItems";
import { ListType } from "../../../types/ListType";

import { useLists, useSetLists } from "../../../providers/Lists";

interface IProps {
  column: {
    name: "Todo" | "In Progress" | "In Review" | "Done";
    icon: ReactElement | JSX.Element;
    items: Array<TaskType>;
  };
  list: ListType;
}

const DraggableTask: FC<IProps> = ({ column, list }) => {
  const { updateTaskPriority, updateTaskStatus } = useSetLists();

  const updateTaskStatusHandler = (taskId: string, newStatus: TaskStatus) => {
    updateTaskStatus({
      newStatus,
      taskId: taskId,
      listId: list.id,
    });
  };

  const updateTaskPriorityHandler = (taskId: string, newPriority: TaskPriority) => {
    updateTaskPriority({
      newPriority,
      taskId,
      listId: list.id,
    });
  };

  return (
    <>
      {column?.items.map((item, index) => (
        <ReactContextMenu.Root key={item.id}>
          <ReactContextMenu.Trigger>
            <Draggable draggableId={item.id} index={index}>
              {(provided: typeof Draggable) => (
                <div
                  className={styles.Task}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div className={styles.TaskHeader}>
                    <p title={item?.title}>{item?.title}</p>
                    <Image alt="Pooria Faramarzian" width={19} height={19} src={userAvatar} className={styles.Avatar} />
                    <div className={styles.AvatarStatus} />
                  </div>
                  <div className={styles.TaskFooter}>
                    <Select
                      items={priorityItems}
                      value={item.priority}
                      variant="outline"
                      onChange={(selectedPriority) => {
                        updateTaskPriorityHandler(item.id, selectedPriority);
                      }}
                      iconOnly
                    />
                    <Select
                      items={statusItems}
                      value={column.name}
                      variant="outline"
                      onChange={(selectedStatus) => {
                        updateTaskStatusHandler(item.id, selectedStatus);
                      }}
                    />
                  </div>
                </div>
              )}
            </Draggable>
          </ReactContextMenu.Trigger>
          <ContextMenu taskId={item.id} />
        </ReactContextMenu.Root>
      ))}
    </>
  );
};

export default DraggableTask;

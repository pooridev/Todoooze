"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { Draggable } from "react-beautiful-dnd-next";
import * as ReactContextMenu from "@radix-ui/react-context-menu";
import classNames from "classnames";

import styles from "./styles.module.css";
import { TaskPriority, TaskType } from "../../../types/Task";
import { ColumnType } from "../../../types/Column";
import ContextMenu from "./ContextMenu";
import Select from "../../shared/Select";
import { columnSelectItems } from "../../../constants/columns";
import { priorityItems, priorityColors } from "../../../constants/priorityItems";
import { ListType } from "../../../types/ListType";
import { formatRelativeTime } from "../../../helpers/relative-time";

import { useSetLists } from "../../../providers/Lists";
import TaskModal from "../TaskModal";

interface IProps {
  column: ColumnType & { items: Array<TaskType> };
  list: ListType;
  onTaskClick: (task: TaskType) => void;
}

const DraggableTask: FC<IProps> = ({ column, list, onTaskClick }) => {
  const { updateTaskPriority, updateTaskColumn, deleteTask } = useSetLists();

  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const statusItems = columnSelectItems(list.columns);

  const updateTaskColumnHandler = (taskId: string, columnId: string) => {
    updateTaskColumn({
      columnId,
      taskId,
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

  const deleteTaskHandler = (taskId: string) => {
    deleteTask({ taskId, listId: list.id });
  };

  return (
    <>
      {column.items.map((item, index) => (
        <ReactContextMenu.Root key={item.id}>
          <ReactContextMenu.Trigger>
            <Draggable draggableId={item.id} index={index}>
              {(provided: typeof Draggable, snapshot: { isDragging?: boolean }) => (
                <div
                  className={classNames(styles.Task, { [styles.Dragging]: snapshot?.isDragging })}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  onClick={(event) => {
                    if (!event.defaultPrevented) onTaskClick(item);
                  }}
                >
                  <span
                    className={styles.PriorityEdge}
                    style={{ backgroundColor: priorityColors[item.priority] }}
                    title={`${item.priority} priority`}
                  />
                  <div className={styles.TaskHeader}>
                    <p title={item?.title}>{item?.title}</p>
                    <Image
                      alt="Assignee avatar"
                      width={19}
                      height={19}
                      src="/assets/images/avatar.jpg"
                      className={styles.Avatar}
                    />
                    <div className={styles.AvatarStatus} />
                  </div>
                  {item.description && <p className={styles.Description}>{item.description}</p>}
                  <div className={styles.TaskFooter} onClick={(event) => event.stopPropagation()}>
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
                      value={item.columnId}
                      variant="outline"
                      onChange={(selectedColumnId) => {
                        updateTaskColumnHandler(item.id, selectedColumnId);
                      }}
                    />
                    <span className={styles.UpdatedAt}>{formatRelativeTime(item.updatedAt)}</span>
                  </div>
                </div>
              )}
            </Draggable>
          </ReactContextMenu.Trigger>
          <ContextMenu onDelete={() => deleteTaskHandler(item.id)} onEdit={() => setEditingTask(item)} />
        </ReactContextMenu.Root>
      ))}

      {editingTask && (
        <TaskModal
          isOpen
          task={editingTask}
          listId={list.id}
          columnId={editingTask.columnId}
          toggle={() => setEditingTask(null)}
        />
      )}
    </>
  );
};

export default DraggableTask;

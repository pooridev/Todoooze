import { createDefaultColumns } from "../constants/columns";
import { asColumnId, ColumnType } from "../types/Column";
import { ListType } from "../types/ListType";
import { TaskType } from "../types/Task";

// Stored data is untyped JSON, so ids are plain strings until validated here.
type LegacyTask = Omit<Partial<TaskType>, "columnId"> & {
  id: string;
  title: string;
  priority: TaskType["priority"];
  status?: string;
  columnId?: string;
};

type LegacyList = {
  id: string;
  title: string;
  description?: string;
  columns?: ColumnType[];
  tasks?: LegacyTask[];
};

/**
 * Brings stored list data up to the column-based schema.
 * Old tasks used a free-text `status` (e.g. "Todo"); new ones use `columnId`.
 */
export const migrateLists = (raw: Record<string, LegacyList>): Record<string, ListType> => {
  const migrated: Record<string, ListType> = {};

  for (const [listId, list] of Object.entries(raw)) {
    if (!list || typeof list !== "object") continue;

    const columns =
      Array.isArray(list.columns) && list.columns.length > 0
        ? list.columns.map((column) => ({
            id: asColumnId(String(column.id)),
            name: String(column.name || "Untitled"),
            color: String(column.color || "#8a8f98"),
          }))
        : createDefaultColumns();

    const columnByName = Object.fromEntries(columns.map((column) => [column.name, column.id]));
    const fallbackColumnId = columns[0].id;

    const tasks: TaskType[] = (list.tasks || []).map((task) => {
      const columnId =
        task.columnId && columns.some((column) => column.id === task.columnId)
          ? asColumnId(task.columnId)
          : columnByName[task.status || ""] || fallbackColumnId;

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        columnId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      };
    });

    migrated[listId] = {
      id: list.id || listId,
      title: list.title || "Untitled list",
      description: list.description || "",
      columns,
      tasks,
    };
  }

  return migrated;
};

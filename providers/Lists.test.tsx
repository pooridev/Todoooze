jest.mock("uuid", () => {
  let uuidCounter = 0;
  return {
    v4: () => `uuid-${++uuidCounter}`,
  };
});

import { Lists, listsReducer } from "./Lists";
import { asColumnId, ColumnType } from "../types/Column";
import { TaskType } from "../types/Task";

const TODO = asColumnId("col-todo");
const PROGRESS = asColumnId("col-progress");
const DONE = asColumnId("col-done");

const columns: ColumnType[] = [
  { id: TODO, name: "Todo", color: "#8a8f98" },
  { id: PROGRESS, name: "In Progress", color: "#f2c94c" },
  { id: DONE, name: "Done", color: "#4cb782" },
];

const task = (overrides: Partial<TaskType> & { id: string }): TaskType => ({
  title: `Task ${overrides.id}`,
  priority: "Medium",
  columnId: TODO,
  ...overrides,
});

const buildState = (): Lists => ({
  "list-1": {
    id: "list-1",
    title: "My list",
    description: "",
    columns: [...columns],
    tasks: [
      task({ id: "a", columnId: TODO }),
      task({ id: "b", columnId: TODO }),
      task({ id: "c", columnId: PROGRESS }),
    ],
  },
});

describe("listsReducer", () => {
  test("ADD_NEW_TASK appends a task with timestamps", () => {
    const next = listsReducer(buildState(), {
      type: "ADD_NEW_TASK",
      payload: {
        listId: "list-1",
        id: "d",
        title: "New task",
        description: "",
        columnId: TODO,
        priority: "High",
      },
    });

    const tasks = next["list-1"].tasks;
    const added = tasks[tasks.length - 1];

    expect(tasks).toHaveLength(4);
    expect(added.id).toBe("d");
    expect(added.createdAt).toEqual(expect.any(Number));
    expect(added.updatedAt).toEqual(expect.any(Number));
  });

  test("DELETE_TASK removes the task", () => {
    const next = listsReducer(buildState(), {
      type: "DELETE_TASK",
      payload: { listId: "list-1", taskId: "b" },
    });

    expect(next["list-1"].tasks.map((t) => t.id)).toEqual(["a", "c"]);
  });

  test("UPDATE_TASK merges updates and bumps updatedAt", () => {
    const next = listsReducer(buildState(), {
      type: "UPDATE_TASK",
      payload: { listId: "list-1", taskId: "a", updates: { title: "Renamed", priority: "Urgent" } },
    });

    const updated = next["list-1"].tasks.find((t) => t.id === "a");

    expect(updated?.title).toBe("Renamed");
    expect(updated?.priority).toBe("Urgent");
    expect(updated?.updatedAt).toEqual(expect.any(Number));
  });

  test("MOVE_TASK changes column and inserts at the requested position", () => {
    const next = listsReducer(buildState(), {
      type: "MOVE_TASK",
      payload: { listId: "list-1", taskId: "a", columnId: PROGRESS, destinationIndex: 0 },
    });

    const progressIds = next["list-1"].tasks.filter((t) => t.columnId === "col-progress").map((t) => t.id);

    expect(progressIds).toEqual(["a", "c"]);
  });

  test("MOVE_TASK reorders within the same column", () => {
    const next = listsReducer(buildState(), {
      type: "MOVE_TASK",
      payload: { listId: "list-1", taskId: "a", columnId: TODO, destinationIndex: 1 },
    });

    const todoIds = next["list-1"].tasks.filter((t) => t.columnId === "col-todo").map((t) => t.id);

    expect(todoIds).toEqual(["b", "a"]);
  });

  test("MOVE_TASK into an empty column appends the task", () => {
    const next = listsReducer(buildState(), {
      type: "MOVE_TASK",
      payload: { listId: "list-1", taskId: "a", columnId: DONE, destinationIndex: 0 },
    });

    const moved = next["list-1"].tasks.find((t) => t.id === "a");

    expect(moved?.columnId).toBe("col-done");
  });

  test("ADD_LIST creates an empty list with default columns", () => {
    const next = listsReducer(buildState(), {
      type: "ADD_LIST",
      payload: { id: "list-2", title: "Second list", description: "About it" },
    });

    expect(next["list-2"].title).toBe("Second list");
    expect(next["list-2"].tasks).toEqual([]);
    expect(next["list-2"].columns).toHaveLength(4);
  });

  test("ADD_COLUMN appends a column", () => {
    const next = listsReducer(buildState(), {
      type: "ADD_COLUMN",
      payload: { listId: "list-1", id: asColumnId("col-blocked"), name: "Blocked", color: "#eb5757" },
    });

    expect(next["list-1"].columns.map((c) => c.name)).toEqual(["Todo", "In Progress", "Done", "Blocked"]);
  });

  test("UPDATE_COLUMN renames and recolors", () => {
    const next = listsReducer(buildState(), {
      type: "UPDATE_COLUMN",
      payload: { listId: "list-1", columnId: TODO, updates: { name: "Backlog", color: "#bb6bd9" } },
    });

    expect(next["list-1"].columns[0]).toMatchObject({ name: "Backlog", color: "#bb6bd9" });
  });

  test("DELETE_COLUMN moves tasks and removes the column", () => {
    const next = listsReducer(buildState(), {
      type: "DELETE_COLUMN",
      payload: { listId: "list-1", columnId: TODO, moveTasksToColumnId: PROGRESS },
    });

    expect(next["list-1"].columns.map((c) => c.id)).toEqual(["col-progress", "col-done"]);
    expect(next["list-1"].tasks.every((t) => t.columnId !== "col-todo")).toBe(true);
    expect(next["list-1"].tasks.filter((t) => t.columnId === "col-progress").map((t) => t.id)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  test("DELETE_COLUMN is a no-op when only one column remains", () => {
    const singleColumnState: Lists = {
      "list-1": {
        id: "list-1",
        title: "My list",
        description: "",
        columns: [{ id: TODO, name: "Todo", color: "#8a8f98" }],
        tasks: [task({ id: "a" })],
      },
    };

    const next = listsReducer(singleColumnState, {
      type: "DELETE_COLUMN",
      payload: { listId: "list-1", columnId: TODO, moveTasksToColumnId: TODO },
    });

    expect(next).toBe(singleColumnState);
  });

  test("REORDER_COLUMNS moves a column by index", () => {
    const next = listsReducer(buildState(), {
      type: "REORDER_COLUMNS",
      payload: { listId: "list-1", sourceIndex: 0, destinationIndex: 2 },
    });

    expect(next["list-1"].columns.map((c) => c.id)).toEqual(["col-progress", "col-done", "col-todo"]);
  });

  test("UPDATE_LIST renames without touching tasks", () => {
    const next = listsReducer(buildState(), {
      type: "UPDATE_LIST",
      payload: { listId: "list-1", title: "Renamed list", description: "New description" },
    });

    expect(next["list-1"].title).toBe("Renamed list");
    expect(next["list-1"].tasks).toHaveLength(3);
  });

  test("DELETE_LIST removes the list", () => {
    const next = listsReducer(buildState(), {
      type: "DELETE_LIST",
      payload: { listId: "list-1" },
    });

    expect(next["list-1"]).toBeUndefined();
  });
});

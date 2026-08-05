import { Lists, listsReducer } from "./Lists";
import { TaskType } from "../types/Task";

const task = (overrides: Partial<TaskType> & { id: string }): TaskType => ({
  title: `Task ${overrides.id}`,
  priority: "Medium",
  status: "Todo",
  ...overrides,
});

const buildState = (): Lists => ({
  "list-1": {
    id: "list-1",
    title: "My list",
    description: "",
    tasks: [
      task({ id: "a", status: "Todo" }),
      task({ id: "b", status: "Todo" }),
      task({ id: "c", status: "In Progress" }),
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
        status: "Todo",
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

  test("MOVE_TASK changes status and inserts at the requested column position", () => {
    // Move "a" (Todo) into the In Progress column, before "c".
    const next = listsReducer(buildState(), {
      type: "MOVE_TASK",
      payload: { listId: "list-1", taskId: "a", newStatus: "In Progress", destinationIndex: 0 },
    });

    const tasks = next["list-1"].tasks;
    const inProgressIds = tasks.filter((t) => t.status === "In Progress").map((t) => t.id);

    expect(inProgressIds).toEqual(["a", "c"]);
  });

  test("MOVE_TASK reorders within the same column", () => {
    // Move "a" below "b" within Todo.
    const next = listsReducer(buildState(), {
      type: "MOVE_TASK",
      payload: { listId: "list-1", taskId: "a", newStatus: "Todo", destinationIndex: 1 },
    });

    const todoIds = next["list-1"].tasks.filter((t) => t.status === "Todo").map((t) => t.id);

    expect(todoIds).toEqual(["b", "a"]);
  });

  test("MOVE_TASK into an empty column appends the task", () => {
    const next = listsReducer(buildState(), {
      type: "MOVE_TASK",
      payload: { listId: "list-1", taskId: "a", newStatus: "Done", destinationIndex: 0 },
    });

    const moved = next["list-1"].tasks.find((t) => t.id === "a");

    expect(moved?.status).toBe("Done");
  });

  test("ADD_LIST creates an empty list", () => {
    const next = listsReducer(buildState(), {
      type: "ADD_LIST",
      payload: { id: "list-2", title: "Second list", description: "About it" },
    });

    expect(next["list-2"]).toEqual({ id: "list-2", title: "Second list", description: "About it", tasks: [] });
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

  test("actions targeting a missing list are no-ops", () => {
    const state = buildState();

    const next = listsReducer(state, {
      type: "DELETE_TASK",
      payload: { listId: "missing", taskId: "a" },
    });

    expect(next).toBe(state);
  });
});

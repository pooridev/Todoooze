import { v4 as uuidv4 } from "uuid";
import { asColumnId, ColumnId, ColumnType } from "../types/Column";

/** Generates a fresh unique id for a new column. */
export const newColumnId = (): ColumnId => asColumnId(uuidv4());

/** Palette offered when creating or recoloring a column. */
export const COLUMN_COLOR_PALETTE = [
  "#8a8f98",
  "#f2c94c",
  "#5e6ad2",
  "#4cb782",
  "#eb5757",
  "#f2994a",
  "#bb6bd9",
  "#56ccf2",
] as const;

const DEFAULT_COLUMN_DEFS: Array<{ name: string; color: string }> = [
  { name: "Todo", color: "#8a8f98" },
  { name: "In Progress", color: "#f2c94c" },
  { name: "In Review", color: "#5e6ad2" },
  { name: "Done", color: "#4cb782" },
];

/** Fresh default columns for a new list (unique ids each call). */
export const createDefaultColumns = (): ColumnType[] =>
  DEFAULT_COLUMN_DEFS.map((column) => ({
    id: newColumnId(),
    name: column.name,
    color: column.color,
  }));

/** Stable, typed ids for the seed columns; use these instead of raw strings. */
export const SEED_COLUMN_IDS = {
  todo: asColumnId("col-todo"),
  inProgress: asColumnId("col-progress"),
  inReview: asColumnId("col-review"),
  done: asColumnId("col-done"),
} as const;

/** Stable seed columns used by the demo lists. */
export const SEED_COLUMNS: ColumnType[] = [
  { id: SEED_COLUMN_IDS.todo, name: "Todo", color: "#8a8f98" },
  { id: SEED_COLUMN_IDS.inProgress, name: "In Progress", color: "#f2c94c" },
  { id: SEED_COLUMN_IDS.inReview, name: "In Review", color: "#5e6ad2" },
  { id: SEED_COLUMN_IDS.done, name: "Done", color: "#4cb782" },
];

export const columnSelectItems = (columns: ColumnType[]) =>
  columns.map((column) => ({
    title: column.id,
    label: column.name,
    icon: (
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: column.color,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
    ),
  }));

import { v4 as uuidv4 } from "uuid";
import { ColumnType } from "../types/Column";

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
    id: uuidv4(),
    name: column.name,
    color: column.color,
  }));

/** Stable seed columns used by the demo lists. */
export const SEED_COLUMNS: ColumnType[] = [
  { id: "col-todo", name: "Todo", color: "#8a8f98" },
  { id: "col-progress", name: "In Progress", color: "#f2c94c" },
  { id: "col-review", name: "In Review", color: "#5e6ad2" },
  { id: "col-done", name: "Done", color: "#4cb782" },
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

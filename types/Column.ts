declare const columnIdBrand: unique symbol;

/**
 * Branded id for a column. It behaves like a string, but a plain string —
 * or some other entity's id — can't be assigned where a `ColumnId` is
 * expected, so mixing up ids is a compile-time error.
 *
 * Raw strings enter the system only through `asColumnId` at data boundaries
 * (id generation, localStorage migration, drag-and-drop droppable ids).
 */
export type ColumnId = string & { readonly [columnIdBrand]: true };

/** Marks a raw string as a `ColumnId`. Only use at data boundaries. */
export const asColumnId = (id: string): ColumnId => id as ColumnId;

export type ColumnType = {
  id: ColumnId;
  name: string;
  color: string;
};

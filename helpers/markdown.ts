/**
 * Small plain-text utilities for Markdown task descriptions.
 * The full renderer lives in `components/shared/Markdown`.
 */

/** Reduces a Markdown source to a single-line plain-text snippet (for cards and rows). */
export const stripMarkdown = (source: string): string =>
  source
    .replace(/```\w*\n?([\s\S]*?)(```|$)/g, "$1")
    .replace(/`([^`\n]+)`/g, "$1")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\s*[-*+]\s+\[[ xX]\]\s*/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+[.)]\s+/gm, "")
    .replace(/^\s*(-{3,}|\*{3,}|_{3,})\s*$/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/\s*\n+\s*/g, " ")
    .trim();

/** Counts `- [ ]` / `- [x]` checklist items in a Markdown source. */
export const checklistStats = (source: string): { done: number; total: number } => {
  const total = (source.match(/^\s*[-*+]\s+\[[ xX]\]/gm) || []).length;
  const done = (source.match(/^\s*[-*+]\s+\[[xX]\]/gm) || []).length;

  return { done, total };
};

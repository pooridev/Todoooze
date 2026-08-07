"use client";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import styles from "./MarkdownEditor.module.css";
import Markdown from "../Markdown";
import {
  BoldIcon,
  ItalicIcon,
  StrikeIcon,
  HeadingIcon,
  CodeIcon,
  LinkIcon,
  QuoteIcon,
  BulletListIcon,
  OrderedListIcon,
  ChecklistIcon,
} from "./icons";

type Mode = "write" | "preview";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Tab shown on mount. Use "preview" when the description already has content. */
  defaultMode?: Mode;
  minRows?: number;
  autoFocus?: boolean;
};

const MAX_HEIGHT = 320;

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
const mod = isMac ? "⌘" : "Ctrl+";

/**
 * A GitHub-style Markdown editor: Write/Preview tabs, a formatting toolbar,
 * keyboard shortcuts, and smart list continuation on Enter. Checklists stay
 * interactive in preview — ticking a checkbox updates the source.
 */
const MarkdownEditor: FC<Props> = ({
  value,
  onChange,
  placeholder = "Add a description…",
  defaultMode = "write",
  minRows = 4,
  autoFocus = false,
}) => {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight + 2, MAX_HEIGHT)}px`;
  }, [value, mode]);

  /** Applies a new value and restores focus/selection after React re-renders. */
  const applyChange = (next: string, selectionStart: number, selectionEnd: number) => {
    onChange(next);
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(selectionStart, selectionEnd);
    });
  };

  const wrapSelection = (marker: string, placeholder = "text") => {
    const el = textareaRef.current;
    if (!el) return;

    const { selectionStart: start, selectionEnd: end } = el;
    const selected = value.slice(start, end) || placeholder;

    // If the selection is already wrapped, unwrap instead.
    const before = value.slice(Math.max(0, start - marker.length), start);
    const after = value.slice(end, end + marker.length);
    if (start >= marker.length && before === marker && after === marker) {
      const next = value.slice(0, start - marker.length) + selected + value.slice(end + marker.length);
      applyChange(next, start - marker.length, start - marker.length + selected.length);
      return;
    }

    const next = value.slice(0, start) + marker + selected + marker + value.slice(end);
    applyChange(next, start + marker.length, start + marker.length + selected.length);
  };

  /** Expands the current selection to whole lines and returns their boundaries. */
  const selectedLineRange = () => {
    const el = textareaRef.current!;
    const { selectionStart: start, selectionEnd: end } = el;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    let lineEnd = value.indexOf("\n", end);
    if (lineEnd === -1) lineEnd = value.length;

    return { lineStart, lineEnd };
  };

  const toggleLinePrefix = (prefix: string | ((index: number) => string), matcher: RegExp) => {
    if (!textareaRef.current) return;

    const { lineStart, lineEnd } = selectedLineRange();
    const segment = value.slice(lineStart, lineEnd);
    const lines = segment.split("\n");
    const allPrefixed = lines.every((line) => matcher.test(line));

    const nextSegment = lines
      .map((line, idx) =>
        allPrefixed ? line.replace(matcher, "") : (typeof prefix === "function" ? prefix(idx) : prefix) + line
      )
      .join("\n");

    const next = value.slice(0, lineStart) + nextSegment + value.slice(lineEnd);
    applyChange(next, lineStart, lineStart + nextSegment.length);
  };

  /** Cycles the heading level of the selected lines: none → # → ## → ### → none. */
  const cycleHeading = () => {
    if (!textareaRef.current) return;

    const { lineStart, lineEnd } = selectedLineRange();
    const segment = value.slice(lineStart, lineEnd);
    const lines = segment.split("\n");
    const level = lines[0].match(/^(#{1,6})\s/)?.[1].length ?? 0;
    const nextLevel = level >= 3 ? 0 : level + 1;

    const nextSegment = lines
      .map((line) => {
        const bare = line.replace(/^#{1,6}\s+/, "");
        return nextLevel === 0 ? bare : `${"#".repeat(nextLevel)} ${bare}`;
      })
      .join("\n");

    const next = value.slice(0, lineStart) + nextSegment + value.slice(lineEnd);
    applyChange(next, lineStart, lineStart + nextSegment.length);
  };

  const insertLink = () => {
    const el = textareaRef.current;
    if (!el) return;

    const { selectionStart: start, selectionEnd: end } = el;
    const selected = value.slice(start, end);
    const text = selected || "link text";
    const inserted = `[${text}](url)`;
    const next = value.slice(0, start) + inserted + value.slice(end);

    // Select "url" when there was text, otherwise select the placeholder text.
    const urlStart = start + text.length + 3;
    if (selected) applyChange(next, urlStart, urlStart + 3);
    else applyChange(next, start + 1, start + 1 + text.length);
  };

  const insertCode = () => {
    const el = textareaRef.current;
    if (!el) return;

    const selected = value.slice(el.selectionStart, el.selectionEnd);
    if (selected.includes("\n")) {
      const { selectionStart: start, selectionEnd: end } = el;
      const next = `${value.slice(0, start)}\`\`\`\n${selected}\n\`\`\`${value.slice(end)}`;
      applyChange(next, start + 4, start + 4 + selected.length);
      return;
    }

    wrapSelection("`", "code");
  };

  const keyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && !event.altKey) {
      const key = event.key.toLowerCase();
      const shortcuts: Record<string, () => void> = {
        b: () => wrapSelection("**"),
        i: () => wrapSelection("*"),
        e: insertCode,
        k: insertLink,
        ...(event.shiftKey ? { x: () => wrapSelection("~~") } : {}),
      };

      if (shortcuts[key]) {
        event.preventDefault();
        shortcuts[key]();
        return;
      }
    }

    if (event.key === "Enter" && !event.shiftKey && !event.metaKey && !event.ctrlKey) {
      continueListOnEnter(event);
    }
  };

  /** Pressing Enter inside a list continues it; on an empty item it ends the list. */
  const continueListOnEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const el = event.currentTarget;
    const { selectionStart: start, selectionEnd: end } = el;
    if (start !== end) return;

    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const line = value.slice(lineStart, start);

    const task = line.match(/^(\s*[-*+]\s+)\[[ xX]\]\s*(.*)$/);
    const bullet = line.match(/^(\s*[-*+]\s+)(.*)$/);
    const ordered = line.match(/^(\s*)(\d+)([.)]\s+)(.*)$/);

    const continuation = task
      ? { marker: `${task[1]}[ ] `, content: task[2] }
      : ordered
      ? { marker: `${ordered[1]}${parseInt(ordered[2], 10) + 1}${ordered[3]}`, content: ordered[4] }
      : bullet
      ? { marker: bullet[1], content: bullet[2] }
      : null;

    if (!continuation) return;
    event.preventDefault();

    if (!continuation.content.trim()) {
      // Enter on an empty item clears the marker and ends the list.
      const next = value.slice(0, lineStart) + value.slice(start);
      applyChange(next, lineStart, lineStart);
      return;
    }

    const inserted = `\n${continuation.marker}`;
    const next = value.slice(0, start) + inserted + value.slice(start);
    applyChange(next, start + inserted.length, start + inserted.length);
  };

  const toggleTaskAtLine = (lineIndex: number) => {
    const lines = value.split("\n");
    const line = lines[lineIndex];
    if (line === undefined) return;

    lines[lineIndex] = /\[[xX]\]/.test(line) ? line.replace(/\[[xX]\]/, "[ ]") : line.replace(/\[ \]/, "[x]");
    onChange(lines.join("\n"));
  };

  const toolbar: Array<{ title: string; icon: JSX.Element; action: () => void } | "divider"> = [
    { title: "Heading", icon: <HeadingIcon />, action: cycleHeading },
    { title: `Bold (${mod}B)`, icon: <BoldIcon />, action: () => wrapSelection("**") },
    { title: `Italic (${mod}I)`, icon: <ItalicIcon />, action: () => wrapSelection("*") },
    { title: `Strikethrough (${mod}⇧X)`, icon: <StrikeIcon />, action: () => wrapSelection("~~") },
    "divider",
    { title: `Code (${mod}E)`, icon: <CodeIcon />, action: insertCode },
    { title: `Link (${mod}K)`, icon: <LinkIcon />, action: insertLink },
    { title: "Quote", icon: <QuoteIcon />, action: () => toggleLinePrefix("> ", /^>\s?/) },
    "divider",
    {
      title: "Bullet list",
      icon: <BulletListIcon />,
      action: () => toggleLinePrefix("- ", /^\s*[-*+]\s+(?!\[[ xX]\])/),
    },
    {
      title: "Numbered list",
      icon: <OrderedListIcon />,
      action: () => toggleLinePrefix((idx) => `${idx + 1}. `, /^\s*\d+[.)]\s+/),
    },
    {
      title: "Checklist",
      icon: <ChecklistIcon />,
      action: () => toggleLinePrefix("- [ ] ", /^\s*[-*+]\s+\[[ xX]\]\s*/),
    },
  ];

  return (
    <div className={styles.Editor}>
      <div className={styles.Header}>
        <div className={styles.Tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "write"}
            className={classNames(styles.Tab, { [styles.ActiveTab]: mode === "write" })}
            onClick={() => setMode("write")}
          >
            Write
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "preview"}
            className={classNames(styles.Tab, { [styles.ActiveTab]: mode === "preview" })}
            onClick={() => setMode("preview")}
          >
            Preview
          </button>
        </div>

        {mode === "write" && (
          <div className={styles.Toolbar}>
            {toolbar.map((entry, idx) =>
              entry === "divider" ? (
                <span key={`divider-${idx}`} className={styles.Divider} />
              ) : (
                <button
                  key={entry.title}
                  type="button"
                  title={entry.title}
                  aria-label={entry.title}
                  className={styles.ToolButton}
                  // Keep focus (and the selection) in the textarea while clicking.
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={entry.action}
                >
                  {entry.icon}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {mode === "write" ? (
        <textarea
          ref={textareaRef}
          className={styles.Textarea}
          value={value}
          rows={minRows}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={({ target }) => onChange(target.value)}
          onKeyDown={keyDownHandler}
        />
      ) : (
        <div className={styles.Preview}>
          {value.trim() ? (
            <Markdown source={value} onToggleTask={toggleTaskAtLine} />
          ) : (
            <p className={styles.EmptyPreview}>Nothing to preview yet.</p>
          )}
        </div>
      )}

      <div className={styles.Footer}>
        <span className={styles.Hint}>
          Markdown supported — <code>**bold**</code> <code>*italic*</code> <code>`code`</code> <code>- [ ] task</code>
        </span>
      </div>
    </div>
  );
};

export default MarkdownEditor;

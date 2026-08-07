import { stripMarkdown, checklistStats } from "./markdown";

describe("stripMarkdown", () => {
  it("flattens formatting into a plain-text snippet", () => {
    const source = "## Heading\n\nSome **bold** and *italic* with `code` and [a link](https://a.b).";

    expect(stripMarkdown(source)).toBe("Heading Some bold and italic with code and a link.");
  });

  it("removes list markers, checkboxes, and quotes", () => {
    const source = "> quoted\n- [x] done thing\n- plain item\n1. ordered";

    expect(stripMarkdown(source)).toBe("quoted done thing plain item ordered");
  });

  it("unwraps fenced code blocks", () => {
    expect(stripMarkdown("```js\nconst a = 1;\n```")).toBe("const a = 1;");
  });
});

describe("checklistStats", () => {
  it("counts done and total checklist items", () => {
    const source = "- [x] one\n- [ ] two\n- [X] three\n- not a checkbox";

    expect(checklistStats(source)).toEqual({ done: 2, total: 3 });
  });

  it("returns zeros when there is no checklist", () => {
    expect(checklistStats("just text")).toEqual({ done: 0, total: 0 });
  });
});

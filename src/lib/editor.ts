import { Editor, Element as SlateElement, Transforms, Range } from "slate";
import { CustomElement } from "../types/slate";

export const withLinks = (editor: Editor) => {
  const { isInline } = editor;

  editor.isInline = (element: CustomElement) => {
    return element.type === "link" ? true : isInline(element);
  };

  return editor;
};

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const isLinkActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && n.type === "link",
  });
  return !!match;
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => SlateElement.isElement(n) && n.type === "link",
  });
};

export const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

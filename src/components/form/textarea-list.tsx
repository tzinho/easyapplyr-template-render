"use client";

import type React from "react";
import { type KeyboardEvent, useCallback, useMemo } from "react";
import {
  createEditor,
  Transforms,
  Editor,
  Node,
  type Descendant,
  Element as SlateElement,
  type NodeEntry,
  type Range,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  type RenderElementProps,
  type RenderLeafProps,
} from "slate-react";
import { useFormContext } from "react-hook-form";
import { withHistory } from "slate-history";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

export type CustomText = {
  placeholder?: string;
  bold?: boolean;
  italic?: boolean;
  text: string;
};

interface HighlightLeaf extends CustomText {
  highlight?: boolean;
}

interface TextareaListProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  highlightWords?: string[];
}

const emptyValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const ListItem = ({ attributes, children }: RenderElementProps) => {
  return (
    <li
      {...attributes}
      className="relative ml-[20px] leading-[1.35em] before:absolute before:left-[-15px] before:text-muted-foreground before:content-['•']"
    >
      {children}
    </li>
  );
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const highlightLeaf = leaf as HighlightLeaf;

  if (highlightLeaf.highlight) {
    return (
      <span
        {...attributes}
        className="relative cursor-pointer rounded bg-yellow-100 transition-colors hover:bg-yellow-200 dark:bg-yellow-900/50 dark:hover:bg-yellow-900/70"
        data-cy="search-highlighted"
      >
        {children}
      </span>
    );
  }

  return <span {...attributes}>{children}</span>;
};

const slateToString = (value: Descendant[]): string => {
  return value
    .map((node) => {
      // Only include text from list items and paragraphs
      if (
        SlateElement.isElement(node) &&
        (node.type === "list-item" || node.type === "paragraph")
      ) {
        return node.children.map((child) => (child as any).text).join("");
      }
      return "";
    })
    .filter((text) => text !== "") // Remove empty lines
    .join("\n");
};

// Add a utility function to convert string to Slate value
const stringToSlate = (
  text: string,
  highlightWords: string[] = [],
): Descendant[] => {
  if (!text || text.trim() === "") {
    return emptyValue;
  }

  return text.split("\n").map((line) => {
    const children: any[] = [];
    let lastIndex = 0;

    // Find all matches for highlight words
    highlightWords.forEach((word) => {
      const regex = new RegExp(word, "gi");
      let match;

      while ((match = regex.exec(line)) !== null) {
        // Add non-highlighted text before match
        if (match.index > lastIndex) {
          children.push({
            text: line.slice(lastIndex, match.index),
          });
        }

        // Add highlighted text
        children.push({
          text: match[0],
          highlight: true,
        });

        lastIndex = match.index + match[0].length;
      }
    });

    // Add remaining text
    if (lastIndex < line.length) {
      children.push({
        text: line.slice(lastIndex),
      });
    }

    // If no highlights were found, use the whole line
    if (children.length === 0) {
      children.push({ text: line });
    }

    return {
      type: "list-item",
      children,
    };
  });
};

const withBullets = (editor: Editor) => {
  const { normalizeNode, insertText } = editor;

  // Override insertText to convert paragraph to bullet when typing starts
  editor.insertText = (text) => {
    const { selection } = editor;

    if (selection && text.length > 0) {
      // Check if we're in a paragraph
      const [match] = Array.from(
        Editor.nodes(editor, {
          at: selection,
          match: (n) => SlateElement.isElement(n) && n.type === "paragraph",
        }),
      );

      // If we found a paragraph and it's empty, convert it to a list item
      if (match) {
        const [node, path] = match;
        if (Node.string(node).length === 0) {
          Transforms.setNodes(editor, { type: "list-item" }, { at: path });
        }
      }
    }

    // Call the original insertText
    insertText(text);
  };

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      // If the editor is completely empty, insert an empty paragraph
      if (editor.children.length === 0) {
        Transforms.insertNodes(editor, emptyValue[0]);
        return;
      }
    }

    normalizeNode([node, path]);
  };

  return editor;
};

export const TextareaList = ({
  name,
  label,
  placeholder,
  className,
  highlightWords = [],
}: TextareaListProps) => {
  const editor = useMemo(
    () => withHistory(withBullets(withReact(createEditor()))),
    [],
  );
  const form = useFormContext();

  const decorate = useCallback(
    ([node, path]: NodeEntry) => {
      const ranges: Range[] = [];

      if (SlateElement.isElement(node) && Array.isArray(node.children)) {
        const texts = node.children.map((it) => it.text);
        highlightWords.forEach((word) => {
          const regex = new RegExp(word, "gi");
          let match;
          regex.lastIndex = 0;

          // Iterate over all matches in the node's text
          while ((match = regex.exec(texts[0])) !== null) {
            ranges.push({
              anchor: { path, offset: match.index },
              focus: { path, offset: match.index + match[0].length },
              highlight: true,
            });
          }
        });
      }
      return ranges;
    },
    [highlightWords],
  );

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "list-item":
        return <ListItem {...props} />;
      case "paragraph":
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // Always insert a new bullet point
      Transforms.insertNodes(editor, {
        type: "list-item",
        children: [{ text: "" }],
      });
    } else if (event.key === "Backspace") {
      const { selection } = editor;

      if (!selection) return;

      // Check if we're at the beginning of a node
      if (selection.anchor.offset === 0) {
        const currentNodeEntry = Editor.above(editor, {
          match: (n) => SlateElement.isElement(n),
        });

        if (currentNodeEntry) {
          const [node, path] = currentNodeEntry;

          // Check if the node is empty
          if (Node.string(node).length === 0) {
            event.preventDefault();

            // If this is the last node, convert it to a paragraph
            if (editor.children.length === 1) {
              Transforms.setNodes(editor, { type: "paragraph" }, { at: path });
              return;
            }

            // Otherwise remove it
            Transforms.removeNodes(editor, { at: path });

            // If this was the last node, insert an empty paragraph
            if (editor.children.length === 0) {
              Transforms.insertNodes(editor, emptyValue[0]);
            }
          }
        }
      }
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        let initialValue = emptyValue;

        if (field.value) {
          // If field.value is a string, convert it to Slate format
          if (typeof field.value === "string") {
            initialValue = stringToSlate(field.value, highlightWords);
          }

          // If it's already an array (Slate format), use it directly
          else if (Array.isArray(field.value) && field.value.length > 0) {
            initialValue = field.value;
          }
        }

        return (
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="rounded-lg border p-4">
                <Slate
                  editor={editor}
                  initialValue={initialValue}
                  onChange={(value) => {
                    // Check if there's any actual content
                    const hasContent = value.some((node) =>
                      node.children.some(
                        (child: any) => child.text.trim() !== "",
                      ),
                    );

                    // Update form value - if empty, use empty string, otherwise convert to string
                    field.onChange(hasContent ? slateToString(value) : "");
                  }}
                >
                  <ul className="outline-none">
                    <Editable
                      decorate={decorate}
                      renderElement={renderElement}
                      renderLeaf={renderLeaf}
                      onKeyDown={onKeyDown}
                      placeholder={placeholder}
                      className="min-h-[100px] outline-none"
                    />
                  </ul>
                </Slate>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

"use client";

import type React from "react";
import { type KeyboardEvent, useCallback, useMemo, useState } from "react";
import {
  createEditor,
  Transforms,
  type Descendant,
  Element as SlateElement,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  type RenderElementProps,
} from "slate-react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Editor } from "slate";
import { Node } from "slate";

interface TextareaListProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
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
const stringToSlate = (text: string): Descendant[] => {
  if (!text || text.trim() === "") {
    return emptyValue;
  }

  return text.split("\n").map((line) => ({
    type: "list-item",
    children: [{ text: line }],
  }));
};

const withBullets = (editor: Editor) => {
  const { normalizeNode, onChange, insertText } = editor;

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
}: TextareaListProps) => {
  const editor = useMemo(() => withBullets(withReact(createEditor())), []);
  const form = useFormContext();

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "list-item":
        return <ListItem {...props} />;
      case "paragraph":
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
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
            initialValue = stringToSlate(field.value);
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
                      renderElement={renderElement}
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

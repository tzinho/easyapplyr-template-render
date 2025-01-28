import React, { useMemo, useCallback } from "react";
import { createEditor, type Descendant, Editor } from "slate";
import { Slate, Editable, withReact, type RenderLeafProps } from "slate-react";
import { withHistory } from "slate-history";
import { useController, useFormContext } from "react-hook-form";

import { HoveringToolbar } from "./toolbar";
import { type CustomElement } from "./types";

const initialValue: Descendant[] = [
  {
    type: "list-item" as const,
    children: [{ text: "" }],
  },
];

interface RichTextEditorProps {
  name: string;
  placeholder?: string;
}

export const RichTextEditor = ({ name, placeholder }: RichTextEditorProps) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue: initialValue,
  });

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    const { attributes, leaf } = props;

    if (leaf.bold) props.children = <strong>{props.children}</strong>;

    if (leaf.italic) props.children = <em>{props.children}</em>;

    if (leaf.underline) props.children = <u>{props.children}</u>;

    if (leaf.link) {
      props.children = (
        <a
          href={leaf.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
          onClick={(e) => {
            if (leaf.link) {
              e.preventDefault();
              window.open(leaf.link, "_blank", "noopener,noreferrer");
            }
          }}
        >
          {props.children}
        </a>
      );
    }

    return <span {...attributes}>{props.children}</span>;
  }, []);

  const renderElement = useCallback(
    (props: {
      attributes: React.HTMLAttributes<HTMLElement>;
      children: React.ReactNode;
      element: CustomElement;
    }) => {
      const { attributes, children, element } = props;

      switch (element.type) {
        case "list-item":
          return (
            <div {...attributes} className="flex items-center">
              <span className="mr-2">•</span>
              {children}
            </div>
          );
        default:
          return <p {...attributes}>{children}</p>;
      }
    },
    [],
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const newProperties: CustomElement = {
        type: "list-item",
        children: [{ text: "" }],
      };

      Editor.insertNode(editor, newProperties);
    }
  };

  return (
    <div className="relative min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
      <Slate
        editor={editor}
        initialValue={(field.value || initialValue) as Descendant[]}
        onChange={field.onChange}
      >
        <HoveringToolbar />
        <Editable
          className="min-h-[180px] outline-none"
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
};

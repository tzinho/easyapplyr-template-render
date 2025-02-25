"use client";

import type React from "react";
import { useCallback, useMemo } from "react";
import { createEditor, type Descendant } from "slate";
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

interface TextareaListProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

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

const deserialize = (text: string): Descendant[] => {
  return text.split("\n").map((line) => ({
    type: "list-item",
    children: [{ text: line }],
  }));
};

const serialize = (nodes: Descendant[]) => {
  return nodes
    .map((node) => {
      return node.children[0].text;
    })
    .join("\n");
};

export const TextareaList = ({
  name,
  label,
  placeholder,
  className,
}: TextareaListProps) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const form = useFormContext();

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "list-item":
        return <ListItem {...props} />;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const onKeyDown = (event: React.KeyboardEvent) => {
          if (event.key === "Enter") {
            event.preventDefault();

            editor.insertNode({
              type: "list-item",
              children: [{ text: "" }],
            });
          }
        };

        return (
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="rounded-lg border p-4">
                <Slate
                  editor={editor}
                  initialValue={deserialize(field.value)}
                  onChange={(value) => field.onChange(serialize(value))}
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

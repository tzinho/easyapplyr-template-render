"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "next/navigation";
import { type SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { createEditor, Range, Node, type Descendant, Transforms } from "slate";
import {
  Editable,
  type RenderElementProps,
  type RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { withHistory } from "slate-history";
import { toast } from "sonner";

import { ButtonLoading } from "~/components/ui/button-loading";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useResumeStore } from "~/providers/resume-store-provider";
import { type Summary } from "~/stores/resume-store";
import { api } from "~/trpc/react";
import { type SummarySchema } from "~/validators";
import { Button } from "~/components/ui/button";
import { EditorToolbar } from "./toolbar";

interface TextareaBulletProps extends React.ComponentProps<"textarea"> {
  name: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  label: string;
}

const serializeToString = (nodes: Descendant[]): string => {
  return nodes.map((n) => Node.string(n as Node)).join("\n");
};

const deserializeFromString = (str: string): Descendant[] => {
  return str.split("\n").map((line) => ({
    type: "paragraph",
    children: [{ text: line }],
  }));
};

const SlateToContentEditable = ({ initialValue }: { initialValue: any[] }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [slateValue, setSlateValue] = useState(initialValue);
  const contentEditableRef = useRef(null);
  const slateRef = useRef(null);

  console.log("slateValue", slateValue);

  useEffect(() => {
    // Sync Slate to contentEditable on Slate changes
    const textContent = slateValue
      .filter((node) => node.type === "bulleted-list")
      .map((node) =>
        node.children
          .filter((item) => item.type === "list-item")
          .map((item) =>
            item.children.map((textNode) => textNode.text).join(""),
          )
          .join("\n"),
      )
      .join("\n");

    if (contentEditableRef.current) {
      contentEditableRef.current.innerHTML = generateHTML(slateValue);
    }
  }, [slateValue]);

  useEffect(() => {
    // Sync contentEditable to Slate on initial load
    if (contentEditableRef.current) {
      contentEditableRef.current.innerHTML = generateHTML(slateValue);
    }
  }, []);

  const generateHTML = (value) => {
    const listItems = value
      .filter((node) => node.type === "bulleted-list")
      .map((node) =>
        node.children
          .filter((item) => item.type === "list-item")
          .map(
            (item, index) =>
              `<li value="${index + 1}" class="relative ml-[10px] before:content-['•'] before:absolute before:left-[-10px] leading-[1.35em]" dir="ltr"><span data-lexical-text="true">${item.children.map((textNode) => textNode.text).join("")}</span></li>`,
          )
          .join(""),
      )
      .join("");

    return `<ul class="list-none">${listItems}</ul>`;
  };

  const handleContentChange = (e) => {
    // Parse contentEditable HTML and update Slate
    const html = contentEditableRef.current.innerHTML;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const listItems = doc.querySelectorAll("li");

    const newSlateValue = [
      {
        type: "bulleted-list",
        children: Array.from(listItems).map((li) => ({
          type: "list-item",
          children: [{ text: li.textContent }],
        })),
      },
    ];

    setSlateValue(newSlateValue);
    Transforms.removeNodes(editor, {
      at: [0],
      match: (n) => n.type === "bulleted-list",
    });
    Transforms.insertNodes(editor, newSlateValue[0], { at: [0] });
  };

  return (
    <div>
      <div
        ref={contentEditableRef}
        contentEditable="true"
        onInput={handleContentChange}
        suppressContentEditableWarning
        style={{ border: "1px solid #ccc", padding: "10px" }}
      />
      <div style={{ display: "none" }}>
        <Slate
          editor={editor}
          value={slateValue || initialValue}
          onChange={setSlateValue}
          ref={slateRef}
        >
          <Editable />
        </Slate>
      </div>
    </div>
  );
};

const TextareaBullet = ({
  name,
  label,
  placeholder,
  description,
  required,
  ...props
}: TextareaBulletProps) => {
  const [selection, setSelection] = useState<Range | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const form = useFormContext();
  const defaultValue = form.getValues(name) as string;
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const contentEditableRef = useRef(null);
  const [slateValue, setSlateValue] = useState(defaultValue);

  const updateToolbarPosition = useCallback(() => {
    const sel = window.getSelection()!;
    if (!sel?.rangeCount) return;

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setToolbarPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }, []);

  const initialValue = useMemo(() => deserializeFromString(defaultValue), []);

  console.log("[initialValue]: ", initialValue);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    console.log("renderLeaf", props);
    return <Leaf {...props} />;
  }, []);

  const renderElement = useCallback((props: RenderElementProps) => {
    console.log("renderElement", props);
    switch (props.element.type) {
      case "bulleted-list":
        (props) => <ul {...props.attributes}>{props.children}</ul>;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const handleContentChange = (e) => {
    // Parse contentEditable HTML and update Slate
    const html = contentEditableRef.current.innerHTML;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const listItems = doc.querySelectorAll("li");

    const newSlateValue = [
      {
        type: "bulleted-list",
        children: Array.from(listItems).map((li) => ({
          type: "list-item",
          children: [{ text: li.textContent }],
        })),
      },
    ];

    setSlateValue(newSlateValue);
    Transforms.removeNodes(editor, {
      at: [0],
      match: (n) => n.type === "bulleted-list",
    });
    Transforms.insertNodes(editor, newSlateValue[0], { at: [0] });
  };

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <FormItem className="w-full">
            <div className="flex items-center justify-between">
              <FormLabel>
                {label} {required && <span className="text-red-500">*</span>}
              </FormLabel>
              <Button disabled size="sm">
                AI help
              </Button>
            </div>
            <FormControl>
              <div
                ref={contentEditableRef}
                contentEditable="true"
                onInput={handleContentChange}
                suppressContentEditableWarning
                style={{ border: "1px solid #ccc", padding: "10px" }}
              />
              <div style={{ display: "none" }}>
                <Slate
                  editor={editor}
                  initialValue={initialValue}
                  onChange={(value) => {
                    console.log("value", value);
                    const content = serializeToString(value);
                    console.log("content", content);
                    field.onChange(content);
                    const { selection } = editor;
                    if (selection && !Range.isCollapsed(selection)) {
                      updateToolbarPosition();
                      setSelection(selection);
                    } else {
                      setSelection(null);
                    }
                  }}
                >
                  <EditorToolbar
                    editor={editor}
                    show={!!selection}
                    position={toolbarPosition}
                  />
                  <Editable
                    spellCheck
                    autoCapitalize="sentences"
                    // onKeyDown={handleOnKeyDown}
                    renderLeaf={renderLeaf}
                    renderElement={renderElement}
                    placeholder={placeholder}
                    className="min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    {...field}
                    {...props}
                  />
                </Slate>
              </div>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return (
    <li
      {...props.attributes}
      className="relative ml-[10px] leading-[1.35em] before:absolute before:left-[-10px] before:content-['•']"
    >
      {props.children}
    </li>
  );
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.link) {
    children = (
      <a
        href={leaf.link}
        className="cursor-pointer text-blue-500 hover:underline"
        onClick={(e) => {
          e.preventDefault();
          toast.info("Link clicked!", {
            description: `URL: ${leaf.link}`,
          });
        }}
      >
        {children}
      </a>
    );
  }
  return <span {...attributes}>{children}</span>;
};

export const SummaryForm = () => {
  const params = useParams<{ id: string }>();

  const { resumeTemplate, setSummaryTemplate } = useResumeStore(
    (state) => state,
  );

  const form = useForm({
    defaultValues: {
      text: "Welcome to the bullet editor\nPress Enter to add new bullets\nSelect text to format it",
    },
  });

  const updateSummaryMutation = api.summary.create.useMutation({
    onSuccess(_, variables) {
      setSummaryTemplate(variables as Summary);
      toast.success("Sumário salvo com sucesso!");
    },
  });

  const handleOnSubmit: SubmitHandler<SummarySchema> = async (d) => {
    await updateSummaryMutation.mutateAsync({
      resumeId: params.id,
      ...d,
    });
  };

  const initialValue = [
    {
      type: "bulleted-list",
      children: [
        {
          type: "list-item",
          children: [{ text: "Item 1" }],
        },
        {
          type: "list-item",
          children: [{ text: "Item 2" }],
        },
      ],
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="flex flex-1 flex-col"
      >
        {/* <TextareaBullet name="text" label="Sumário" rows={4} /> */}
        <SlateToContentEditable initialValue={initialValue} />
        <ButtonLoading
          isLoading={updateSummaryMutation.isPending}
          className="self-end"
        >
          Salvar suas informações
        </ButtonLoading>
      </form>
    </Form>
  );
};

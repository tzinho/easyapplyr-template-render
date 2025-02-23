"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { type SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { createEditor, Range, Node, type Descendant } from "slate";
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
import { type Element } from "slate";
import { EditorToolbar } from "./toolbar";

interface TextareaBulletProps extends React.ComponentProps<"textarea"> {
  name: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  label: string;
}

const BULLET = "• ";

const serializeToString = (nodes: Descendant[]): string => {
  return nodes.map((n) => Node.string(n as Node)).join("\n");
};

const deserializeFromString = (str: string): Descendant[] => {
  return str.split("\n").map((line) => ({
    type: "paragraph",
    children: [{ text: line }],
  }));
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

  const handleLinkClick = (url: string) => {
    toast.info("Link clicked!", {
      description: `URL: ${url}`,
    });
  };

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const lastNode = editor.children[editor.children.length - 1] as Element;
      if ((lastNode.children[0] as Text).text.trim() !== "•") {
        editor.insertNode({ type: "paragraph", children: [{ text: BULLET }] });
      }
    }
  };

  const initialValue = useMemo(() => deserializeFromString(defaultValue), []);

  console.log("[initialValue]: ", initialValue);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

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
              <div className="relative">
                <Slate
                  editor={editor}
                  initialValue={initialValue}
                  onChange={(value) => {
                    const content = serializeToString(value);
                    field.onChange(content);
                    const { selection } = editor;
                    if (selection && !Range.isCollapsed(selection)) {
                      console.log("update");
                      updateToolbarPosition();
                      setSelection(selection);
                    } else {
                      setSelection(null);
                      console.log("insert");
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
                    onKeyDown={handleOnKeyDown}
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

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
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
      text: "• Welcome to the bullet editor\n• Press Enter to add new bullets\n• Select text to format it",
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="flex flex-1 flex-col"
      >
        <TextareaBullet name="text" label="Sumário" rows={4} />
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

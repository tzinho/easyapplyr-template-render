"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { type SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { createEditor, Range, Node, type Descendant, Editor } from "slate";
import { Bold, Italic, Underline, Link, X } from "lucide-react";
import { Editable, Slate, withReact } from "slate-react";
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


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Input } from "~/components/ui/input";

interface EditorToolbarProps {
  editor: Editor;
  show: boolean;
  position: { top: number; left: number } | null;
}

export const EditorToolbar = ({
  editor,
  show,
  position,
}: EditorToolbarProps) => {
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  if (!show || !position) return null;

  const toggleMark = (format: string) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl) {
      Editor.addMark(editor, "link", linkUrl);
    }
    setIsLinkPopoverOpen(false);
    setLinkUrl("");
  };

  const removeLink = () => {
    Editor.removeMark(editor, "link");
    setIsLinkPopoverOpen(false);
  };

  const getCurrentLink = () => {
    const marks = Editor.marks(editor);
    return marks?.link;
  };

  return (
    <div
      className="fixed z-50 rounded-lg border border-gray-200 bg-white/90 p-1 shadow-lg backdrop-blur-sm transition-all duration-200 ease-in-out"
      style={{
        top: `${position.top - 40}px`,
        left: `${position.left}px`,
      }}
    >
      <TooltipProvider>
        <div className="flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleMark("bold")}
                className={`hover:bg-gray-100 ${
                  isMarkActive(editor, "bold") ? "bg-gray-100" : ""
                }`}
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleMark("italic")}
                className={`hover:bg-gray-100 ${
                  isMarkActive(editor, "italic") ? "bg-gray-100" : ""
                }`}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleMark("underline")}
                className={`hover:bg-gray-100 ${
                  isMarkActive(editor, "underline") ? "bg-gray-100" : ""
                }`}
              >
                <Underline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Underline</p>
            </TooltipContent>
          </Tooltip>

          <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`hover:bg-gray-100 ${
                  isMarkActive(editor, "link") ? "bg-gray-100" : ""
                }`}
              >
                <Link className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3">
              <form onSubmit={handleLinkSubmit} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="url"
                    placeholder="Enter URL..."
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="flex-1"
                  />
                  {getCurrentLink() && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeLink}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Button type="submit" size="sm">
                  {getCurrentLink() ? "Update Link" : "Add Link"}
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </TooltipProvider>
    </div>
  );
};

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
      const lastNode = editor.children[editor.children.length - 1]!;
      if (lastNode.children[0].text.trim() !== "•") {
        editor.insertNode({ type: "paragraph", children: [{ text: "• " }] });
      }
    }
  };

  const initialValue = useMemo(() => deserializeFromString(defaultValue), []);

  console.log("[initialValue]: ", initialValue);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const renderElement = useCallback((props: any) => {
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
                      setSelection(selection)
                    } else {
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
\                    className="min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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

const Leaf = ({ attributes, children, leaf }: any) => {
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
        {/* <Textarea name="text" label="Sumário" rows={4} /> */}
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

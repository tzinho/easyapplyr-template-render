import React, { useRef, useEffect, type PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { Editor, Range } from "slate";
import { useSlate, useFocused } from "slate-react";
import { Bold, Italic, Underline, Link } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const Portal = ({ children }: PropsWithChildren) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

interface ToolbarButtonProps {
  isActive?: boolean;
  onMouseDown: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ElementType;
  format: string;
}

const ToolbarButton = ({
  icon: Icon,
  isActive,
  onMouseDown,
}: ToolbarButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", isActive && "bg-muted text-primary")}
      onMouseDown={onMouseDown}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) return;

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();

    if (rect) {
      el.style.opacity = "1";
      el.style.pointerEvents = "auto";
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight - 6}px`;
      el.style.left = `${
        rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
      }px`;
    }
  });

  const isMarkActive = (format: string) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (format: string, value: any = true) => {
    const isActive = isMarkActive(format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, value);
    }
  };

  return (
    <Portal>
      <div
        ref={ref}
        className="fixed z-50 -mt-2 flex -translate-y-full rounded-lg border bg-background shadow-lg transition-opacity duration-200"
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <ToolbarButton
          format="bold"
          icon={Bold}
          isActive={isMarkActive("bold")}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark("bold");
          }}
        />
        <ToolbarButton
          format="italic"
          icon={Italic}
          isActive={isMarkActive("italic")}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark("italic");
          }}
        />
        <ToolbarButton
          format="underline"
          icon={Underline}
          isActive={isMarkActive("underline")}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark("underline");
          }}
        />
        <ToolbarButton
          format="link"
          icon={Link}
          isActive={isMarkActive("link")}
          onMouseDown={(e) => {
            e.preventDefault();
            const url = window.prompt("Enter the URL of the link:");
            if (url) {
              toggleMark("link", url);
            }
          }}
        />
      </div>
    </Portal>
  );
};

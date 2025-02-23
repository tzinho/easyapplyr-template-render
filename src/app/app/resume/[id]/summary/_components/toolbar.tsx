"use client";

import { useState } from "react";
import { Bold, Italic, Underline, Link, X } from "lucide-react";
import { Editor } from "slate";

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
import { Button } from "~/components/ui/button";

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
                type="button"
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
                type="button"
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
                type="button"
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
                type="button"
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
                  {getCurrentLink() ? "Atualizar link" : "Adicionar link"}
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </TooltipProvider>
    </div>
  );
};

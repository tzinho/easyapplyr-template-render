"use client";

import * as React from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { useResumeStore } from "~/providers/resume-store-provider";

const colors = [
  "#9333EA", // Purple
  "#4F46E5", // Indigo
  "#3B82F6", // Blue
  "#10B981", // Green
  "#EF4444", // Red
  "#F97316", // Orange
  "#6366F1", // Another purple
  "#EC4899", // Pink
  "#F59E0B", // Yellow
  "#000000", // Black
];

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full border-2 p-0"
            style={{ backgroundColor: value }}
          >
            <span className="sr-only">Pick a color</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <PopoverClose key={color}>
                <button
                  key={color}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 border-transparent p-0 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                    value === color &&
                      "ring-2 ring-slate-900 dark:ring-slate-400",
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => onChange(color)}
                >
                  <span className="sr-only">Select color: {color}</span>
                </button>
              </PopoverClose>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

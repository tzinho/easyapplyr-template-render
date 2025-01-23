"use client";

import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type NavigationProps } from "~/types/template";

export function ResumeButtonGroup({
  sections,
  currentSection,
  onNavigate,
  onToggleSection,
}: NavigationProps) {
  // Update the optionalSections filter
  const optionalSections = sections.filter(
    (section) => !section.required && !section.added && section.removable,
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-2">
      {sections.map(
        (section) =>
          (section.added || !section.removable) && (
            <Button
              key={section.id}
              variant={currentSection === section.id ? "default" : "outline"}
              onClick={() => onNavigate(section.id)}
              className="h-7 text-xs"
            >
              {section.label}
              {section.removable && section.added && (
                <button
                  className="ml-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSection(section.id);
                  }}
                >
                  ×
                </button>
              )}
            </Button>
          ),
      )}
      {optionalSections.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-7">
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {optionalSections.map((section) => (
              <DropdownMenuItem
                key={section.id}
                onSelect={() => onToggleSection(section.id)}
                className="text-sm"
              >
                {section.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

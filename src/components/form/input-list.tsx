"use client";

import { useState } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface SkillsInputProps {
  name: string;
  defaultHighlights?: string[];
  onChange?: (highlights: string[]) => void;
  placeholder?: string;
}

export default function InputList({
  name,
  defaultHighlights = [],
  onChange,
  placeholder,
}: SkillsInputProps) {
  const [highlights, setHighlights] = useState<string[]>(defaultHighlights);

  const { control, reset } = useFormContext();

  const handleSubmit = (callback: (data: { skill: string }) => void) => {
    return () => {
      const value = control._getWatch(name);
      callback({ [name]: value });
    };
  };

  const addHighlight = (data: any) => {
    if (data[name].trim()) {
      const newHighlights = [...highlights, data[name].trim()];
      setHighlights(newHighlights);
      onChange?.(newHighlights);
      reset({ [name]: "" });
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = highlights.filter((_, i) => i !== index);
    setHighlights(newSkills);
    onChange?.(newSkills);
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex flex-wrap gap-2">
        {highlights.map((highlight, index) => (
          <Badge
            key={index}
            className="flex items-center rounded-full px-3 py-1 text-sm"
          >
            {highlight}
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="ml-1 focus:outline-none"
              aria-label={`Remove ${highlight}`}
            >
              <X size={16} />
            </button>
          </Badge>
        ))}
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            // className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(addHighlight)();
              }
            }}
          />
        )}
      />
    </div>
  );
}

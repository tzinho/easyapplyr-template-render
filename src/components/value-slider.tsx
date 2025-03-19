"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Slider } from "~/components/ui/slider";

interface ValueSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  unit?: string;
  onChange?: (value: number) => void;
}

export function ValueSlider({
  min = 1,
  max = 2,
  step = 0.05,
  defaultValue = 1.5,
  unit = "EM",
  onChange,
}: ValueSliderProps) {
  const [value, setValue] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);

  const handleValueChange = (newValues: number[]) => {
    const newValue = newValues[0];
    setValue(newValue);
    onChange?.(newValue);
  };

  // Format the value to display with 2 decimal places when needed
  const formattedValue = value % 1 === 0 ? value.toString() : value.toFixed(2);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-20 justify-between px-2" size="sm">
          {formattedValue}
          {unit}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="start">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">
            {formattedValue}
            {unit}
          </span>
          <span className="text-sm font-medium">
            {max}
            {unit}
          </span>
        </div>
        <Slider
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={handleValueChange}
          className="my-2"
        />
      </PopoverContent>
    </Popover>
  );
}

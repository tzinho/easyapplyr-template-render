"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useController, useFormContext } from "react-hook-form";

import { Switch } from "~/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Input } from "../ui/input";
import { index } from "drizzle-orm/mysql-core";
import { cn } from "~/lib/utils";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

interface DateTimeRangePickerProps {
  prefix: string;
  index: number;
  label: string;
}

interface MonthPickerProps {
  onChange: (date: Date) => void;
  currentYear: number;
  handleYearChange: (increment: number) => void;
  currentView: "start" | "end";
  value: Date | null;
  isPresent?: boolean;
  setIsPresent: Dispatch<SetStateAction<boolean>>;
}

const MonthPicker = ({
  onChange,
  currentYear,
  handleYearChange,
  currentView,
  value,
  isPresent,
  setIsPresent,
}: MonthPickerProps) => (
  <div className="p-4">
    <div className="mb-4 flex items-center justify-between">
      <button
        onClick={() => handleYearChange(-1)}
        className="group rounded-full p-1 transition-colors hover:bg-primary"
      >
        <ChevronLeft className="h-4 w-4 group-hover:stroke-primary-foreground" />
      </button>
      <span className="text-lg font-medium">{currentYear}</span>
      <button
        onClick={() => handleYearChange(1)}
        className="rounded-full p-1 transition-colors hover:bg-gray-700"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {months.map((month, index) => (
        <motion.button
          key={month}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const newDate = new Date(currentYear, index);
            const year = newDate.getFullYear();
            const day = String(newDate.getDate() + 1).padStart(2, "0");
            onChange(
              `${year}-${String(index + 1).padStart(2, "0")}-${day}T03:00:00Z`,
            );
          }}
          className={cn(
            "rounded p-[2px] text-sm transition-colors",
            new Date(value)?.getMonth() === index
              ? "bg-primary text-primary-foreground"
              : "hover:bg-primary hover:text-primary-foreground",
            currentView === "end" && isPresent && "pointer-events-none",
          )}
        >
          {month.slice(0, 3)}
        </motion.button>
      ))}
    </div>
    {currentView === "end" && (
      <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-4">
        <span className="text-sm">Trabalha aqui atualmente</span>
        <Switch
          checked={isPresent}
          onCheckedChange={(checked) => {
            setIsPresent(checked);
            if (checked) {
              const newDate = new Date();
              const year = newDate.getFullYear();
              const month = newDate.getMonth();
              const day = String(newDate.getDate()).padStart(2, "0");
              onChange(
                `${year}-${String(month + 1).padStart(2, "0")}-${day}T03:00:00Z`,
              );
            }
          }}
        />
      </div>
    )}
  </div>
);

export const DateTimeRangePicker = ({
  prefix,
  index,
  label,
}: DateTimeRangePickerProps) => {
  const form = useFormContext();

  const { field: startDate } = useController({
    name: `${prefix}.${index}.startAt`,
    control: form.control,
  });

  const { field: endDate } = useController({
    name: `${prefix}.${index}.endAt`,
    control: form.control,
  });

  const [isPresent, setIsPresent] = useState<boolean>(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleYearChange = (increment: number) => {
    setCurrentYear((prev) => prev + increment);
  };

  return (
    <div className="w-full space-y-2 py-1">
      <h3 className="text-sm font-medium">{label}</h3>
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                readOnly
                className="w-full cursor-pointer px-4 py-2 outline-none ring-blue-500 focus:ring-2"
                value={
                  startDate.value
                    ? `${months[new Date(startDate.value)?.getMonth()]?.slice(0, 3)} ${new Date(startDate.value)?.getFullYear()}`
                    : ""
                }
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="border-gray-700"
            onOpenAutoFocus={(e) => {
              e.preventDefault();
            }}
          >
            <MonthPicker
              currentView="start"
              onChange={startDate.onChange}
              isPresent={isPresent}
              handleYearChange={handleYearChange}
              currentYear={currentYear}
              setIsPresent={setIsPresent}
              value={startDate.value as Date | null}
            />
          </PopoverContent>
        </Popover>
        <span>-</span>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                readOnly
                className="w-full cursor-pointer px-4 py-2 outline-none ring-blue-500 focus:ring-2"
                {...endDate}
                value={
                  isPresent
                    ? "Presente"
                    : endDate.value
                      ? `${months[new Date(endDate.value)?.getMonth()]?.slice(0, 3)} ${new Date(endDate.value)?.getFullYear()}`
                      : ""
                }
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="border-gray-700"
            onOpenAutoFocus={(e) => {
              e.preventDefault();
            }}
          >
            <MonthPicker
              currentView="end"
              onChange={endDate.onChange}
              isPresent={isPresent}
              handleYearChange={handleYearChange}
              currentYear={currentYear}
              setIsPresent={setIsPresent}
              value={endDate.value as Date | null}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

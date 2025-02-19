"use client";

import { type PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import {
  SelectContent,
  SelectTrigger,
  Select as SelectShadcn,
  SelectValue,
} from "../ui/select";

interface SelectProps extends PropsWithChildren {
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const Select = ({
  name,
  placeholder,
  className,
  children,
  label,
}: SelectProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            <Label htmlFor={`${name}-id`}>{label}</Label>
            <SelectShadcn
              onValueChange={field.onChange}
              defaultValue={field.value as string}
            >
              <SelectTrigger id={`${name}-id`}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>{children}</SelectContent>
            </SelectShadcn>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

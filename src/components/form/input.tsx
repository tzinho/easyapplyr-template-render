"use client";

import { useFormContext } from "react-hook-form";

import { Input as InputShadcn } from "~/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface InputProps extends React.ComponentProps<"input"> {
  name: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  label: string;
  className?: string;
}

export const Input = ({
  name,
  label,
  placeholder,
  description,
  required,
  className,
  ...props
}: InputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <InputShadcn placeholder={placeholder} {...field} {...props} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

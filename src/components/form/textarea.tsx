import { useFormContext } from "react-hook-form";
import { Textarea as TextareaShadcn } from "../ui/textarea";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface TextareaProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  label: string;
}

export const Textarea = ({
  name,
  label,
  placeholder,
  description,
  required,
}: TextareaProps) => {
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
            <TextareaShadcn placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

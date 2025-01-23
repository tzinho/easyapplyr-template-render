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
import { TextareaUL } from "react-textarea-list";

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

export const TextareaList = ({
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
            <TextareaUL
              bulletChar="• "
              placeholder={placeholder}
              // listOutput={false}
              defaultValue={"test,tres"}
              // {...field}
              onChange={(value) => {
                console.log("value", value);
                field.onChange(value);
              }}
              className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

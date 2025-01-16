import { useFormContext } from "react-hook-form";
import { Input as InputShadcn } from "../ui/input";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface InputProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  label: string;
}

export const Input = ({ name, label, placeholder, required }: InputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <InputShadcn placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
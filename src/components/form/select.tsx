import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import {
  SelectContent,
  SelectTrigger,
  Select as SelectShadcn,
  SelectValue,
} from "../ui/select";
import { type PropsWithChildren } from "react";

interface SelectProps extends PropsWithChildren {
  name: string;
  placeholder?: string;
  label?: string;
}

export const Select = ({ name, placeholder, children, label }: SelectProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <Label htmlFor="experience">{label}</Label>
            <SelectShadcn
              onValueChange={field.onChange}
              defaultValue={field.value as string}
            >
              <SelectTrigger>
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

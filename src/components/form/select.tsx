import { useFormContext } from "react-hook-form";

import { FormField, FormItem } from "../ui/form";
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
}

export const Select = ({ name, placeholder, children }: SelectProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <Label htmlFor="experience">Experience</Label>
            <SelectShadcn
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>{children}</SelectContent>
            </SelectShadcn>
          </FormItem>
        );
      }}
    />
  );
};

"use client";

import { type SubmitHandler, useFormContext } from "react-hook-form";

import { Input } from "~/components/form/input";
import { type ItemType } from "./form";
import { Textarea } from "~/components/form/textarea";
import { Button } from "~/components/ui/button";

interface FormBodyProps {
  editingItem: ItemType | null;
  onSubmit: SubmitHandler<ItemType>;
  setEditingItem: (item: ItemType | null) => void;
}

export const FormBody = ({
  editingItem,
  setEditingItem,
  onSubmit,
}: FormBodyProps) => {
  const form = useFormContext<{
    items: ItemType[];
    name: string;
    description: string;
  }>();

  return (
    <div className="w-full p-6 md:w-1/2">
      <h2 className="mb-6 text-lg font-bold">
        {editingItem ? "Edit Item" : "Education 1"}
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Input name="name" label="Name" placeholder="Enter name" />
        <Textarea
          name="description"
          label="Description"
          placeholder="Enter description"
        />

        <div className="flex justify-end space-x-4">
          {editingItem && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditingItem(null);
                form.reset({
                  name: "",
                  description: "",
                  items: form.getValues("items"),
                });
              }}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">{editingItem ? "Update" : "Add"}</Button>
        </div>
      </form>
    </div>
  );
};

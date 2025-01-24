import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import * as z from "zod";
import { Input } from "~/components/form/input";
import { Textarea } from "~/components/form/textarea";
import { FormBody } from "./form-body";
import { List } from "./list";

const itemSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
});

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  items: z.array(itemSchema),
});

export type FormValues = z.infer<typeof formSchema>;
export type ItemType = z.infer<typeof itemSchema>;

const Index = () => {
  const [editingItem, setEditingItem] = useState<ItemType | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      items: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "items",
  });

  console.log("fields", fields);
  console.log("getValues", form.getValues());
  const watchItems = form.watch("items");
  console.log("watchItems", watchItems);

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
    if (editingItem) {
      console.log("editingId", editingItem);
      const index = fields.findIndex((item) => item.id === editingItem.id);
      console.log("index", index);
      if (index !== -1) {
        update(index, { ...data }); // Update all item properties
        toast.success("Item updated successfully!");
      }
      setEditingItem(null);
    } else {
      const newItem = {
        // id: uuidv4(),
        ...data,
      };
      append(newItem);
      toast.success("Item added successfully!");
    }
    form.reset({
      name: "",
      description: "",
      items: form.getValues("items"),
    });
  };

  const handleEdit = (item: ItemType) => {
    setEditingItem(item);
    form.reset({
      name: item.name,
      description: item.description,
      items: form.getValues("items"), // Maintain existing items
    });
  };

  const handleDelete = (id: string) => {
    const index = fields.findIndex((item) => item.id === id);
    if (index !== -1) {
      remove(index);
      if (editingItem?.id === id) {
        setEditingItem(null);
        form.reset({
          name: "",
          description: "",
          items: form.getValues("items"), // Maintain existing items
        });
      }
      toast.success("Item deleted successfully!");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      <Form {...form}>
        {/* Form Section */}
        <FormBody
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          onSubmit={onSubmit}
        />

        {/* List Section */}
        <List
          fields={fields}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Form>
    </div>
  );
};

export default Index;

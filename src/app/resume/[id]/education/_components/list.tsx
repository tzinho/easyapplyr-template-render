import { Pencil, Trash2 } from "lucide-react";

import { Button } from "~/components/ui/button";
import { type ItemType } from "./form";

interface Item {
  id: string;
  name: string;
  description: string;
}

export const List = ({
  fields,
  handleEdit,
  handleDelete,
}: {
  fields: Item[];
  handleEdit: (item: ItemType) => void;
  handleDelete: (item: ItemType) => void;
}) => {
  console.log("ff", fields);
  return (
    <div className="w-full border-r border-gray-200 p-6 md:w-1/2">
      <div className="space-y-4">
        {fields.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-gray-700">{item.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {fields.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No items added yet. Use the form to add some!
          </div>
        )}
      </div>
    </div>
  );
};

import { templates } from "~/app/_templates";
import { type Template } from "~/types/template";

export const getTemplate = (templateId: string): Template => {
  return templates.find((template) => template.id === templateId)!;
};

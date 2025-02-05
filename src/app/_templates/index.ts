import { type Template } from "~/types/template";
import * as SimpleTemplate from "./simple";

export const templates = [
  {
    id: "1",
    title: "Simple",
    component: SimpleTemplate.Simple,
    defaultSections: SimpleTemplate.defaultSections,
  },
] as Template[];

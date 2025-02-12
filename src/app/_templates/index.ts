import { type Template } from "~/types/template";
import * as SimpleTemplate from "./simple";
import * as ModernTemplate from "./modern";

export const templates = [
  {
    id: "1",
    title: "São Paulo",
    component: SimpleTemplate.Template,
    defaultSections: SimpleTemplate.defaultSections,
    settings: {
      fontSize: 9,
      primaryColor: "purple",
    },
  },
  {
    id: "2",
    title: "Guarulhos",
    component: ModernTemplate.Template,
    defaultSections: ModernTemplate.defaultSections,
    settings: {
      fontSize: 9,
      primaryColor: "black",
    },
  },
] as Template[];

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
      fontSize: 13,
      primaryColor: "purple",
      fontFamily: "Merriweather",
      paperSize: "Letter",
      showIcons: true,
      sectionSpacing: 1,
      lineHeight: 21,
      indent: false,
      showSeparators: true,
    },
  },
  {
    id: "2",
    title: "Guarulhos",
    component: ModernTemplate.Template,
    defaultSections: ModernTemplate.defaultSections,
    settings: {
      fontSize: 13,
      primaryColor: "black",
      fontFamily: "Merriweather",
      paperSize: "A4",
      showIcons: false,
      sectionSpacing: 1,
      lineHeight: 21,
      indent: false,
      showSeparators: false,
    },
  },
] as Template[];

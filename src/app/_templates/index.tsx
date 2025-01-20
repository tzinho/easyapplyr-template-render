import { type Template } from "~/types/template";
import { Simple } from "./simple";
import { Modern } from "./modern";

export const templates = [
  {
    id: "1",
    title: "Simple",
    component: Simple,
  },
  {
    id: "2",
    title: "Modern",
    component: Modern,
  },
] as Template[];

import { type Template } from "~/types/template";
import * as SaoPaulo from "./sao-paulo";
import * as Guarulhos from "./guarulhos";
import * as PracaOito from "./praca-oito";

export const templates = [
  {
    id: "1",
    title: "São Paulo",
    component: SaoPaulo.Template,
    defaultSections: SaoPaulo.defaultSections,
    isPro: false,
    categories: ["pro"],
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
    component: Guarulhos.Template,
    defaultSections: Guarulhos.defaultSections,
    isPro: true,
    categories: ["pro", "marketing"],
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
  {
    id: "3",
    title: "Praça oito",
    component: PracaOito.Template,
    defaultSections: PracaOito.defaultSections,
    isPro: false,
    categories: ["pro"],
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
] as Template[];

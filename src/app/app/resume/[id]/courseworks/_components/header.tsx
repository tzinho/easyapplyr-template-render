"use client";

import { School2 } from "lucide-react";

import { PageNavbarSearchAction } from "~/components/page";
import { Nav } from "../../../_components/nav";

export const Header = () => {
  return (
    <>
      <PageNavbarSearchAction
        title="Cursos"
        subtitle="Adicione seus cursos"
        icon={School2}
      ></PageNavbarSearchAction>
      <Nav />
    </>
  );
};

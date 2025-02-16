"use client";

import { School2 } from "lucide-react";

import { PageNavbarSearchAction } from "~/components/page";
import { Nav } from "../../../_components/nav";

export const Header = () => {
  return (
    <>
      <PageNavbarSearchAction
        title="Habilidades"
        subtitle="Adicione suas habilidades"
        icon={School2}
      ></PageNavbarSearchAction>
      <Nav />
    </>
  );
};

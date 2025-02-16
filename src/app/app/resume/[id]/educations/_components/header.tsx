"use client";

import { School2 } from "lucide-react";

import { PageNavbarSearchAction } from "~/components/page";
import { Nav } from "../../../_components/nav";

export const Header = () => {
  return (
    <>
      <PageNavbarSearchAction
        title="Educações"
        subtitle="Adicione suas escolaridades"
        icon={School2}
      ></PageNavbarSearchAction>
      <Nav />
    </>
  );
};

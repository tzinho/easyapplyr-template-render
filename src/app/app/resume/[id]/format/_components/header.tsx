"use client";

import { Eye } from "lucide-react";

import { PageNavbarSearchAction } from "~/components/page";
import { Nav } from "../../../_components/nav";

export const Header = () => {
  return (
    <>
      <PageNavbarSearchAction
        title="Visualização"
        subtitle="Visualize ou edite o modelo"
        icon={Eye}
      ></PageNavbarSearchAction>
      <Nav />
    </>
  );
};

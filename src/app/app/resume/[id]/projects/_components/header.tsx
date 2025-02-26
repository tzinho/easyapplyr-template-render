"use client";

import { Projector } from "lucide-react";

import { PageNavbarSearchAction } from "~/components/page";
import { Nav } from "../../../_components/nav";

export const Header = () => {
  return (
    <>
      <PageNavbarSearchAction
        title="Projetos"
        subtitle="Adicione um projeto"
        icon={Projector}
      ></PageNavbarSearchAction>
      <Nav />
    </>
  );
};

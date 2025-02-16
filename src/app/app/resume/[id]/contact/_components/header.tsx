"use client";

import { UserCircle2 } from "lucide-react";

import { PageNavbarSearchAction } from "~/components/page";
import { Nav } from "../../../_components/nav";

export const Header = () => {
  return (
    <>
      <PageNavbarSearchAction
        title="Informações"
        subtitle="Adicione sua informações pessoais"
        icon={UserCircle2}
      ></PageNavbarSearchAction>
      <Nav />
    </>
  );
};

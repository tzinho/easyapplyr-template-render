"use client";

import { Languages } from "lucide-react";

import { PageNavbarSearchAction } from "~/components/page";
import { Nav } from "../../../_components/nav";

export const Header = () => {
  return (
    <>
      <PageNavbarSearchAction
        title="Línguas"
        subtitle="Adicione suas línguas"
        icon={Languages}
      ></PageNavbarSearchAction>
      <Nav />
    </>
  );
};

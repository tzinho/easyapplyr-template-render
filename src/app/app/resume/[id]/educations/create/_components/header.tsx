"use client";

import { UserCircle2 } from "lucide-react";

import { PageNavbarSearchAction } from "~/components/page";

export const Header = () => {
  return (
    <>
      <PageNavbarSearchAction
        title="Educações"
        subtitle="Adicione uma educação"
        icon={UserCircle2}
      ></PageNavbarSearchAction>
    </>
  );
};

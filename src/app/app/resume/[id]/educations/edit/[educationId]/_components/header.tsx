"use client";

import { UserCircle2 } from "lucide-react";

import { PageNavbarSearchAction } from "~/components/page";

export const Header = () => {
  return (
    <>
      <PageNavbarSearchAction
        title="Educações"
        subtitle="Edite a educação"
        icon={UserCircle2}
      ></PageNavbarSearchAction>
    </>
  );
};

"use client";

import { File } from "lucide-react";

import { PageNavbarSearchAction } from "~/components/page";

interface HeaderProps {
  onOpenChange?: (open: boolean) => void;
}

export const Header = ({ onOpenChange }: HeaderProps) => {
  return (
    <>
      <PageNavbarSearchAction
        title="Vagas de emprego"
        subtitle="Busque vagas de emprego"
        icon={File}
      ></PageNavbarSearchAction>
    </>
  );
};

"use client";

import { UserCheck, Plus } from "lucide-react";

import {
  PageNavbarPrimaryButton,
  PageNavbarSearchAction,
} from "~/components/page";

interface HeaderProps {
  onOpenChange?: (open: boolean) => void;
}

export const Header = ({ onOpenChange }: HeaderProps) => {
  return (
    <>
      <PageNavbarSearchAction
        title="IA Entrevista"
        subtitle="Simule uma entrevista"
        icon={UserCheck}
      >
        {/* <PageNavbarPrimaryButton onClick={() => onOpenChange?.(true)}>
          <Plus size={16} />
          <span className="hidden md:inline">Criar entrevista</span>
        </PageNavbarPrimaryButton> */}
      </PageNavbarSearchAction>
    </>
  );
};

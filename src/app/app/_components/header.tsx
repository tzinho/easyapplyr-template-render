"use client";

import { File, Plus } from "lucide-react";

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
        title="Currículos"
        subtitle="Gerencie seus currículos"
        icon={File}
      >
        <PageNavbarPrimaryButton onClick={() => onOpenChange?.(true)}>
          <Plus size={16} />
          <span className="hidden md:inline">Criar currículo</span>
        </PageNavbarPrimaryButton>
      </PageNavbarSearchAction>
    </>
  );
};

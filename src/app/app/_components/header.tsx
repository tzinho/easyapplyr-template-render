"use client";

import { FileUser, Plus } from "lucide-react";

import { ModalToCreateAResume } from "~/app/_components/modal-to-create-a-resume";
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
        icon={FileUser}
      >
        <ModalToCreateAResume>
          <PageNavbarPrimaryButton onClick={() => onOpenChange?.(true)}>
            <Plus size={16} />
            <span className="hidden md:inline">Criar currículo</span>
          </PageNavbarPrimaryButton>
        </ModalToCreateAResume>
      </PageNavbarSearchAction>
    </>
  );
};

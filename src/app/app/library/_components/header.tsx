"use client";

import { File, Plus } from "lucide-react";

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
        title="Biblioteca"
        subtitle="Busque pelo modelo ideal"
        icon={File}
      >
        <ModalToCreateAResume>
          <PageNavbarPrimaryButton onClick={() => onOpenChange?.(true)}>
            <Plus size={16} />
            <span className="hidden md:inline">Indicar um modelo</span>
          </PageNavbarPrimaryButton>
        </ModalToCreateAResume>
      </PageNavbarSearchAction>
    </>
  );
};

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
        title="Configurações"
        subtitle="Gerencie as configurações da sua conta"
        icon={File}
      />
    </>
  );
};

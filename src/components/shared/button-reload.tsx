"use client";

import { RefreshCcw } from "lucide-react";

import { Button, type ButtonProps } from "../ui/button";
import { cn } from "~/lib/utils";

const ButtonReload = ({ className, ...props }: ButtonProps) => {
  const handleClick = () =>
    window && typeof window !== "undefined" && window.location.reload();

  return (
    <Button
      className={cn("w-fit", className)}
      variant="outline"
      type="button"
      onClick={handleClick}
      {...props}
    >
      <RefreshCcw />
      Clique aqui pra recarregar a página
    </Button>
  );
};

export { ButtonReload };

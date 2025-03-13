"use client";

import { useFormContext } from "react-hook-form";

import InputList from "~/components/form/input-list";
import { Button } from "~/components/ui/button";

export const AIWriter = () => {
  const form = useFormContext();

  const handleAiHelp = () => {
    console.log("[values]: ", form.getValues());
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div>
        A IA Writer ajuda você a escrever seu resumo para uma posição de
        trabalho direcionada. Resultado estranho? Apenas se regenere!
      </div>
      <div className="flex flex-col gap-2">
        <InputList
          name="highlights"
          placeholder="Insira uma ou mais habilidades"
        />

        <Button onClick={handleAiHelp} type="button">
          AI Help
        </Button>
      </div>
    </div>
  );
};

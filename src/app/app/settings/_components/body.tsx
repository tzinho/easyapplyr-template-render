"use client";

import { PageContent } from "~/components/page";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import DeleteAccount from "./delete-account";

export const Body = () => {
  return (
    <PageContent className="flex justify-center">
      <div className="w-full max-w-3xl rounded-lg border border-gray-200 p-8 md:p-12">
        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div>
            <h3 className="text-md font-semibold text-primary">
              Configurações de linguagem
            </h3>
            <p className="text-muted-foreground">
              Selecione a linguagem que será usada no aplicativo
            </p>
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-fit">
              <SelectValue placeholder="Selecione uma língua" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="portuguese">Português</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-4 w-full" />

        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div>
            <h3 className="text-md font-semibold text-primary">Mudar email</h3>
            <p className="text-muted-foreground">
              Seu endereço de e -mail atual é tthiaguinho638@gmail.com.
              (Assinado com o google.com.)
            </p>
          </div>
          <Button className="w-full md:w-fit" variant="outline">
            Mudar o endereço de email
          </Button>
        </div>

        <Separator className="my-4 w-full" />

        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div>
            <h3 className="text-md font-semibold text-primary">
              Atualizar pagamento
            </h3>
            <p className="text-muted-foreground">
              Atualize suas informações de pagamento acessando sua conta na
              stripe
            </p>
          </div>
          <Button variant="outline" className="w-full md:w-fit">
            Deletar conta
          </Button>
        </div>

        <Separator className="my-4 w-full" />

        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div>
            <h3 className="text-md font-semibold text-primary">
              Deletar conta
            </h3>
            <p className="text-muted-foreground">
              Exclua permanentemente sua conta e todos os seus currículos
            </p>
          </div>
          <DeleteAccount />
        </div>
      </div>
    </PageContent>
  );
};

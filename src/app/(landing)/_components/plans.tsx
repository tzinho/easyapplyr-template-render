"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { buttonVariants } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import { cn } from "~/lib/utils";

interface PlanCardProps {
  name: string;
  subtitle: string;
  value: string;
  guarantee?: boolean;
  main?: boolean;
}

function PlanCard({ name, subtitle, value, guarantee, main }: PlanCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 border border-solid border-gray-300 p-8",
        main && "bg-primary text-primary-foreground",
      )}
    >
      <p className="text-2xl">{value}</p>
      <p className="">{subtitle}</p>

      <Separator />

      <h3 className="text-5xl">{name}</h3>
      <Link
        href="/sign-up"
        className={cn(
          buttonVariants(),
          "w-full",
          main &&
            "bg-secondary text-primary hover:bg-secondary/90 hover:text-primary",
        )}
      >
        Cadastrar-se gratuitamente
      </Link>
      {guarantee && (
        <div className="flex items-center justify-center gap-3">
          <ShieldCheck className="fill-green-500 text-white" />
          <span>Garantia de devolução de 100% do dinheiro</span>
        </div>
      )}
    </div>
  );
}

export const Plans = () => {
  return (
    <div className="center mx-5 flex-col gap-10" id="plans">
      <h1 className="w-full text-center text-4xl font-black">
        Planos e Preços
      </h1>
      <p className="text-xl text-primary/80">
        Satisfação garantida com reembolso de 100%
      </p>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        <PlanCard
          name="Grátis"
          value="Não é necessário cartão"
          subtitle="Experimente como funciona. Nenhum pagamento necessário."
        />
        <PlanCard
          name="Pro"
          value="$29 Mensal"
          subtitle="Desbloqueie recursos premium. Cobrança mensal."
          guarantee
          main
        />
        <PlanCard
          name="Vitalício"
          value="$149 Pagamento único"
          subtitle="Pague uma vez e aproveite o acesso vitalício."
          guarantee
        />
      </div>
    </div>
  );
};

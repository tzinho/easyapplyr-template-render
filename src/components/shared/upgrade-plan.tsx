"use client";

import { useId } from "react";
import { CheckIcon, RefreshCcwIcon, X } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import usePremiumModal from "~/hooks/use-premium-modal";

export function UpgradePlan() {
  const id = useId();
  const { open, setOpen } = usePremiumModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="mb-2 flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <RefreshCcwIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Se torne PRO</DialogTitle>
            <DialogDescription className="text-left">
              Escolha um dos seguintes planos
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <RadioGroup className="gap-2" defaultValue="2">
            <div className="has-data-[state=checked]:border-ring has-data-[state=checked]:bg-accent shadow-xs relative flex w-full items-center gap-2 rounded-md border border-input px-4 py-3 outline-none">
              <RadioGroupItem
                value="1"
                id={`${id}-1`}
                aria-describedby={`${id}-1-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label htmlFor={`${id}-1`}>Essential</Label>
                <p
                  id={`${id}-1-description`}
                  className="text-xs text-muted-foreground"
                >
                  R$9,90/mês
                </p>
              </div>
            </div>
            {/* Radio card #2 */}
            <div className="has-data-[state=checked]:border-ring has-data-[state=checked]:bg-accent shadow-xs relative flex w-full items-center gap-2 rounded-md border border-input px-4 py-3 outline-none">
              <RadioGroupItem
                value="2"
                id={`${id}-2`}
                aria-describedby={`${id}-2-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label htmlFor={`${id}-2`}>Standard</Label>
                <p
                  id={`${id}-2-description`}
                  className="text-xs text-muted-foreground"
                >
                  R$19,90/mês
                </p>
              </div>
            </div>
            <div className="has-data-[state=checked]:border-ring has-data-[state=checked]:bg-accent shadow-xs relative flex w-full items-center gap-2 rounded-md border border-input px-4 py-3 outline-none">
              <RadioGroupItem
                value="3"
                id={`${id}-3`}
                aria-describedby={`${id}-3-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label htmlFor={`${id}-3`}>Enterprise</Label>
                <p
                  id={`${id}-3-description`}
                  className="text-xs text-muted-foreground"
                >
                  R$32,90/mês
                </p>
              </div>
            </div>
          </RadioGroup>

          <div className="space-y-3">
            <p>
              <strong className="text-sm font-medium">
                Funcionalidades incluídas:
              </strong>
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                Crie currículos ilimitados
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                Remove watermarks.
              </li>
              <li className="flex items-center gap-2">
                <div className="inline-flex size-4 items-center justify-center rounded-full bg-red-500">
                  <X
                    size={14}
                    className="mt-0.5 shrink-0 text-white"
                    aria-hidden="true"
                  />
                </div>
                Add unlimited users and free viewers.
              </li>
              <li className="flex items-center gap-2">
                <div className="inline-flex size-4 items-center justify-center rounded-full bg-green-500">
                  <CheckIcon
                    size={14}
                    className="mt-0.5 shrink-0 text-white"
                    aria-hidden="true"
                  />
                </div>
                Upload unlimited files.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                7-day money back guarantee.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                Advanced permissions.
              </li>
            </ul>
          </div>

          <div className="grid gap-2">
            <Button type="button" className="w-full">
              Continuar
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="w-full">
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

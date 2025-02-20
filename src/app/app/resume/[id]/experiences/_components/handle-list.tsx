import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { Switch } from "~/components/ui/switch";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "~/components/ui/tooltip";
import {
  Plus,
  GripVertical,
  MoreHorizontal,
  EyeClosedIcon,
  Trash,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

interface ExperienceListProps {
  onAppend: any;
  allowInsert: any;
  onClick: any;
  onRemove: any;
}

export const ExperienceList = ({
  onAppend,
  allowInsert,
  onClick,
  onRemove,
}: ExperienceListProps) => {
  const form = useFormContext();
  const fields = useWatch({
    control: form.control,
    name: "experiences",
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Suas experiências</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="h-5 w-5"
                  onClick={onAppend}
                  disabled={!allowInsert}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar uma experiência</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {fields.map((field, index) => {
          const role =
            form.watch(`experiences.${index}.role`) || "Experiência 1";
          const company =
            form.watch(`experiences.${index}.company`) || "Empresa 1";

          return (
            <div
              className="group flex w-full items-center gap-1"
              key={field.id}
            >
              <GripVertical className="h-4 w-4 cursor-grab opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <div
                onClick={() => onClick(index)}
                className="flex flex-1 cursor-pointer items-center justify-between rounded-md border px-2 py-1"
              >
                <div>
                  <p className="text-sm">{role}</p>
                  <span className="text-xs">{company}</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size="icon"
                            className="h-5 w-5"
                            variant="ghost"
                          >
                            <MoreHorizontal />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit px-3 py-2">
                          <div className="flex flex-col gap-1">
                            <Button
                              className="flex items-center justify-start gap-3"
                              variant="ghost"
                            >
                              <EyeClosedIcon />
                              <div className="flex items-center">
                                <Label
                                  htmlFor="close"
                                  className="cursor-pointer"
                                >
                                  Esconder no currículo
                                </Label>
                                <Switch id="close" />
                              </div>
                            </Button>
                            <Separator />
                            <Button
                              className="flex items-center justify-start gap-3"
                              variant="ghost"
                              onClick={() => onRemove(index)}
                            >
                              <Trash className="h-4 w-4" />
                              <Label className="cursor-pointer">Deletar</Label>
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ações</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

"use client";

import Link from "next/link";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Copy, Delete, Edit2, MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "~/components/ui/card";
import { type Resume } from "~/types/template";
import { api } from "~/trpc/react";
import { useToast } from "~/hooks/use-toast";

interface CardResumeProps {
  resume: Resume;
  setSelectedResume: (resume: Resume) => void;
}

export const CardResume = ({ resume, setSelectedResume }: CardResumeProps) => {
  const { toast } = useToast();
  const utils = api.useUtils();

  const duplicateResumeMutation = api.resumes.duplicate.useMutation({
    onSuccess: () => {
      toast({ title: "O curriculum foi duplicado com sucesso!" });
      void utils.resumes.list.invalidate();
    },
  });

  return (
    <Card
      className="flex h-[290px] w-full max-w-[215.16px] flex-col justify-between overflow-hidden"
      key={resume.id}
    >
      <Link href={`/resume/${resume.id}/contact`}>
        <CardContent>
          <CardHeader></CardHeader>
        </CardContent>
      </Link>
      <CardFooter className="flex-shrink-0 flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="">
            <h4 className="text-base">{resume.title}</h4>
            <p className="text-sm text-muted-foreground">
              {formatDistance(new Date(resume.updatedAt), new Date(), {
                addSuffix: true,
                locale: ptBR,
              })}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-3 w-3" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1">
              <DropdownMenuItem asChild>
                <Link href={`/resume/${resume.id}/contact`}>
                  <Edit2 /> Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => duplicateResumeMutation.mutate(resume.id)}
              >
                <Copy />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedResume(resume)}>
                <Delete /> Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
};

"use client";

import {
  Settings,
  Trash,
  Copy,
  MoreVertical,
  ChevronRight,
} from "lucide-react";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "~/components/ui/dropdown-menu";
import { Card } from "~/components/ui/card";
import { type Resume } from "~/types/template";
import { useRouter } from "next/navigation";
import { TemplatePreview } from "./template-preview";
import { api } from "~/trpc/react";

interface ResumePreviewProps {
  onDelete: (resume: Resume) => void;
  onDuplicate: () => void;
  onMove?: (destination: string) => void;
  resume: Resume;
}

export const ResumePreview = ({
  onDelete,
  onDuplicate,
  onMove,
  resume,
}: ResumePreviewProps) => {
  const router = useRouter();
  const data = api.resumes.get.useQuery(resume.id);

  const handleOnEdit = (resume: Resume) => {
    router.push(`/resume/${resume.id}/contact`);
  };

  if (data.isLoading) return null;

  return (
    <Card className="group relative flex h-[290px] w-[240px] flex-col overflow-hidden border border-gray-200 bg-white shadow-sm">
      <div className="relative flex-grow">
        <div>
          <TemplatePreview templateId={resume.templateId} data={data.data} />
        </div>

        <div className="invisible absolute inset-0 flex items-center justify-center gap-4 bg-gray-900/70 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <Button
            onClick={() => handleOnEdit(resume)}
            size="icon"
            className="h-9 w-9 rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
          >
            <Settings className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => onDelete(resume)}
            size="icon"
            className="h-9 w-9 rounded-full bg-red-500 transition-colors hover:bg-red-600"
          >
            <Trash className="h-6 w-6" />
          </Button>
          <Button
            onClick={onDuplicate}
            size="icon"
            className="h-9 w-9 rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
          >
            <Copy className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t bg-white p-3">
        <div className="flex flex-col">
          <span className="max-w-[160px] truncate text-sm font-medium">
            {resume.title}
          </span>
          <span className="text-xs text-gray-500">
            Editado{" "}
            {formatDistance(new Date(resume.updatedAt), new Date(), {
              addSuffix: true,
              locale: ptBR,
            })}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onSelect={() => handleOnEdit(resume)}>
              <Settings className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicar
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ChevronRight className="mr-2 h-4 w-4" />
                Mover
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onSelect={() => onMove?.("folder1")}>
                    Tag #1
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => onMove?.("folder2")}>
                    Tag #2
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => onDelete(resume)}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

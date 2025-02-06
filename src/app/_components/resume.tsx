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
import { Switch } from "~/components/ui/switch";
import { Card } from "~/components/ui/card";
import { type Resume } from "~/types/template";
import { useRouter } from "next/navigation";
import { data } from "tailwindcss/defaultTheme";
import { TemplatePreview } from "./template-preview";
import { api } from "~/trpc/react";

interface CompactResumePreviewProps {
  lastEdited?: string;
  onDelete: (resume: Resume) => void;
  onDuplicate: () => void;
  onReview?: () => void;
  onMove?: (destination: string) => void;
  onSearchableChange?: (isSearchable: boolean) => void;
  resume: Resume;
}

export function CompactResumePreview({
  onDelete,
  onDuplicate,
  onReview,
  onMove,
  onSearchableChange,
  resume,
}: CompactResumePreviewProps) {
  const router = useRouter();
  const data = api.resumes.get.useQuery(resume.id);

  const onEdit = (resume: Resume) => {
    router.push(`/resume/${resume.id}/contact`);
  };

  if (data.isLoading) return null;

  console.log("[templateId]: ", resume.templateId);
  console.log("[data]: ", data.data);

  return (
    <Card className="group relative flex h-[290px] w-[240px] flex-col overflow-hidden border border-gray-200 bg-white shadow-sm">
      <div className="relative flex-grow">
        <TemplatePreview templateId={resume.templateId} data={data.data} />

        <div className="invisible absolute inset-0 flex items-center justify-center gap-4 bg-gray-900/70 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <Button
            onClick={() => onEdit(resume)}
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
          >
            <Settings className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => onDelete(resume)}
            size="icon"
            className="h-12 w-12 rounded-full bg-red-500 transition-colors hover:bg-red-600"
          >
            <Trash className="h-6 w-6" />
          </Button>
          <Button
            onClick={onDuplicate}
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
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
            <DropdownMenuItem onSelect={() => onEdit(resume)}>
              <Settings className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicar
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onReview}>
              <ChevronRight className="mr-2 h-4 w-4" />
              Review
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
}

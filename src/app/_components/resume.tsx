"use client";

import {
  Settings,
  Trash,
  Copy,
  MoreVertical,
  ChevronRight,
  Lock,
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
import { useRouter } from "next/navigation";
import { TemplatePreview } from "./template-preview";
import { type Resume } from "~/stores/resume-store";

interface ResumePreviewProps {
  onDelete: (resume: Resume) => void;
  onDuplicate: () => void;
  onMove?: (destination: string) => void;
  resumeTemplate: Resume;
}

export const ResumePreview = ({
  onDelete,
  onDuplicate,
  onMove,
  resumeTemplate,
}: ResumePreviewProps) => {
  const router = useRouter();

  const handleOnEdit = (resumeTemplate: Resume) => {
    router.push(`/resume/${resumeTemplate.id}/contact`);
  };

  return (
    <Card className="group relative h-[290px] w-[215.16px] cursor-pointer transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0 overflow-hidden rounded-lg bg-white p-3">
        <div>
          <TemplatePreview resumeTemplate={resumeTemplate} isPreview={true} />
        </div>

        <div className="invisible absolute inset-0 flex items-center justify-center gap-4 bg-gray-900/70 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <Button
            onClick={() => handleOnEdit(resumeTemplate)}
            size="icon"
            className="h-9 w-9 rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
          >
            <Settings className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => onDelete(resumeTemplate)}
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
            {resumeTemplate.title}
          </span>
          <span className="text-xs text-gray-500">
            Editado{" "}
            {formatDistance(new Date(resumeTemplate.updatedAt), new Date(), {
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
            <DropdownMenuItem onSelect={() => handleOnEdit(resumeTemplate)}>
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
              onSelect={() => onDelete(resumeTemplate)}
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

interface ResumePreviewProps {
  onDelete: (resume: Resume) => void;
  onDuplicate: () => void;
  onMove?: (destination: string) => void;
  resumeTemplate: Resume;
}

export const ResumePreview2 = ({
  onDelete,
  onDuplicate,
  onMove,
  resumeTemplate,
}: ResumePreviewProps) => {
  const handleOnEdit = (resumeTemplate: Resume) => {
    console.log("Editing resume:", resumeTemplate.id);
  };

  // A4 aspect ratio is 1:1.4142 (width:height)
  const paperWidth = 215.16; // px
  const paperHeight = Math.min(290, paperWidth * 1.4142); // Maintain A4 ratio but cap at container height

  return (
    <Card className="group relative h-[290px] w-[215.16px] cursor-pointer transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0 overflow-hidden rounded-lg bg-white">
        <div className="relative flex h-full w-full items-center justify-center bg-gray-50">
          {/* Paper preview with shadow */}
          <div
            className="relative bg-white shadow-lg"
            style={{
              width: `${paperWidth}px`,
              height: `${paperHeight}px`,
            }}
          >
            {/* Resume content preview */}
            <div className="absolute inset-4 flex origin-top-left scale-[0.4] transform flex-col gap-1.5">
              {/* Header section */}
              <div className="text-[16px] font-bold text-gray-900">
                John Doe
              </div>
              <div className="text-[10px] text-gray-600">
                Senior Software Engineer
              </div>
              <div className="text-[8px] text-gray-500">
                john.doe@example.com • (555) 123-4567 • New York, NY
              </div>

              {/* Summary section */}
              <div className="mt-2">
                <div className="border-b border-gray-200 text-[12px] font-semibold text-gray-800">
                  Professional Summary
                </div>
                <div className="mt-0.5 text-[6px] text-gray-600">
                  Experienced software engineer with 8+ years of expertise in
                  full-stack development, cloud architecture, and team
                  leadership. Proven track record of delivering scalable
                  solutions and driving innovation.
                </div>
              </div>

              {/* Experience section */}
              <div className="mt-2">
                <div className="border-b border-gray-200 text-[12px] font-semibold text-gray-800">
                  Experience
                </div>
                <div className="mt-1">
                  <div className="text-[10px] font-medium text-gray-700">
                    Senior Software Engineer
                  </div>
                  <div className="text-[8px] text-gray-600">
                    Tech Innovations Inc. • 2020 - Present
                  </div>
                  <div className="mt-0.5 text-[6px] text-gray-500">
                    • Led development of microservices architecture serving 1M+
                    users • Managed team of 5 developers, improving productivity
                    by 40% • Implemented CI/CD pipelines reducing deployment
                    time by 60%
                  </div>
                </div>
                <div className="mt-1">
                  <div className="text-[10px] font-medium text-gray-700">
                    Software Engineer
                  </div>
                  <div className="text-[8px] text-gray-600">
                    Digital Solutions Co. • 2018 - 2020
                  </div>
                  <div className="mt-0.5 text-[6px] text-gray-500">
                    • Developed RESTful APIs for mobile applications • Optimized
                    database queries improving response time by 50% • Mentored
                    junior developers in best practices
                  </div>
                </div>
              </div>

              {/* Education section */}
              <div className="mt-2">
                <div className="border-b border-gray-200 text-[12px] font-semibold text-gray-800">
                  Education
                </div>
                <div className="mt-1">
                  <div className="text-[10px] font-medium text-gray-700">
                    Master of Computer Science
                  </div>
                  <div className="text-[8px] text-gray-600">
                    Tech University • 2018-2020
                  </div>
                </div>
                <div className="mt-0.5">
                  <div className="text-[10px] font-medium text-gray-700">
                    BS Computer Science
                  </div>
                  <div className="text-[8px] text-gray-600">
                    State University • 2014-2018
                  </div>
                </div>
              </div>

              {/* Skills section */}
              <div className="mt-2">
                <div className="border-b border-gray-200 text-[12px] font-semibold text-gray-800">
                  Skills
                </div>
                <div className="mt-0.5 text-[8px] text-gray-600">
                  Languages: JavaScript, TypeScript, Python, Go
                </div>
                <div className="text-[8px] text-gray-600">
                  Technologies: React, Node.js, AWS, Docker, Kubernetes, MongoDB
                </div>
                <div className="text-[8px] text-gray-600">
                  Tools: Git, Jenkins, Terraform, ELK Stack
                </div>
              </div>
            </div>
          </div>

          {resumeTemplate.isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10">
              <Lock className="h-6 w-6 text-gray-500" />
            </div>
          )}
        </div>

        <div className="invisible absolute inset-0 flex items-center justify-center gap-4 bg-gray-900/70 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <Button
            onClick={() => handleOnEdit(resumeTemplate)}
            size="icon"
            className="h-9 w-9 rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
          >
            <Settings className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => onDelete(resumeTemplate)}
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

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white p-3">
        <div className="flex flex-col">
          <span className="max-w-[160px] truncate text-sm font-medium">
            {resumeTemplate.title}
          </span>
          <span className="text-xs text-gray-500">
            Edited{" "}
            {formatDistance(new Date(resumeTemplate.updatedAt), new Date(), {
              addSuffix: true,
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
            <DropdownMenuItem onSelect={() => handleOnEdit(resumeTemplate)}>
              <Settings className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ChevronRight className="mr-2 h-4 w-4" />
                Move
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
              onSelect={() => onDelete(resumeTemplate)}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

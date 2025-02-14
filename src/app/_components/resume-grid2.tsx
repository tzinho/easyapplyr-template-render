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
import { useRouter } from "next/navigation";

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
    router.push(`/app/resume/${resumeTemplate.id}/contact`);
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
  const router = useRouter();

  const handleOnEdit = (resumeTemplate: Resume) => {
    router.push(`/app/resume/${resumeTemplate.id}/contact`);
  };

  // A4 aspect ratio is 1:1.4142 (width:height)
  const paperWidth = 215.16; // px
  const paperHeight = Math.min(290, paperWidth * 1.4142); // Maintain A4 ratio but cap at container height

  return (
    <Card className="group relative h-[290px] w-[215.16px] cursor-pointer transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0 overflow-hidden rounded-lg bg-white">
        <div className="relative h-full w-full bg-gray-50">
          {/* Paper preview with shadow */}
          <div className="absolute inset-0 bg-white shadow-lg">
            {/* Resume content preview */}
            <div className="absolute inset-0 h-full w-full origin-top-left scale-[0.3] transform">
              <div className="flex min-h-full w-[333%] flex-col p-12">
                {/* Header section */}
                <div className="space-y-2">
                  <div className="text-[48px] font-bold text-gray-900">
                    Charles Bloomberg
                  </div>
                  <div className="flex items-center gap-4 text-[24px] text-gray-600">
                    Web Marketing, United States
                    <span className="text-gray-400">•</span>
                    charlesb@gmail.com
                    <span className="text-gray-400">•</span>
                    (234) 567-8901
                  </div>
                </div>

                {/* Professional section */}
                <div className="mt-8">
                  <div className="border-b-2 border-[#9b87f5] pb-1 text-[32px] font-semibold text-[#9b87f5]">
                    PROFESSIONAL
                  </div>
                  <div className="mt-4 text-[24px] leading-relaxed text-gray-600">
                    Marketing professional with over 10+ years of experience in
                    marketing and advertising. Proven track record of driving
                    successful marketing initiatives across multiple platforms.
                    Strong analytical skills and creative problem-solving
                    abilities.
                  </div>
                </div>

                {/* Experience section */}
                <div className="mt-8">
                  <div className="border-b-2 border-[#9b87f5] pb-1 text-[32px] font-semibold text-[#9b87f5]">
                    EXPERIENCE
                  </div>
                  <div className="mt-4 space-y-6">
                    <div>
                      <div className="text-[28px] font-semibold text-gray-800">
                        Marketing Director
                      </div>
                      <div className="text-[24px] text-gray-600">
                        Tech Solutions Company • New York, NY
                      </div>
                      <div className="mt-2 text-[20px] text-gray-600">
                        • Led comprehensive marketing strategies across digital
                        and traditional channels
                        <br />
                        • Managed team of 8 marketing professionals, increasing
                        department efficiency by 40%
                        <br />• Developed and executed successful product
                        launches with 25% above target ROI
                      </div>
                    </div>
                    <div>
                      <div className="text-[28px] font-semibold text-gray-800">
                        Senior Marketing Manager
                      </div>
                      <div className="text-[24px] text-gray-600">
                        Digital Innovations Ltd • San Francisco, CA
                      </div>
                      <div className="mt-2 text-[20px] text-gray-600">
                        • Spearheaded digital marketing initiatives resulting in
                        150% growth in online presence
                        <br />
                        • Implemented data-driven marketing strategies
                        increasing customer engagement by 60%
                        <br />• Coordinated with sales team to achieve 125% of
                        annual revenue targets
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education section */}
                <div className="mt-8">
                  <div className="border-b-2 border-[#9b87f5] pb-1 text-[32px] font-semibold text-[#9b87f5]">
                    EDUCATION
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="text-[28px] font-semibold text-gray-800">
                        MBA in Marketing
                      </div>
                      <div className="text-[24px] text-gray-600">
                        Stanford University • 2015
                      </div>
                    </div>
                    <div>
                      <div className="text-[28px] font-semibold text-gray-800">
                        BS in Business Administration
                      </div>
                      <div className="text-[24px] text-gray-600">
                        UC Berkeley • 2011
                      </div>
                    </div>
                  </div>
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

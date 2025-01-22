"use client";

import {
  Settings,
  Trash,
  Copy,
  MoreVertical,
  ChevronRight,
} from "lucide-react";
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
import { Card, CardContent } from "~/components/ui/card";
import { type Resume } from "~/types/template";
import { useState } from "react";
import { api } from "~/trpc/react";
import { DeleteResume } from "./dialog/delete-resume";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface ResumeData {
  header: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }>;
  isLocked?: boolean;
  resumeTitle: string;
  isSearchable?: boolean;
}

interface CompactResumePreviewProps {
  data: ResumeData;
  lastEdited?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onReview?: () => void;
  onMove?: (destination: string) => void;
  onSearchableChange?: (isSearchable: boolean) => void;
  resume: Resume;
}

const fakeUserData = {
  resumeTitle: "Copy of Copy of Product Marketing",
  header: {
    fullName: "Charles Bloomberg",
    title: "Product Marketing Manager",
    email: "charles.bloomberg@email.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
  },
  summary:
    "Results-driven product marketing professional with extensive experience...",
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Product Marketing Manager",
      startDate: "2020",
      endDate: "Present",
      description:
        "Led product marketing initiatives resulting in 150% growth...",
    },
  ],
  education: [
    {
      institution: "New York University",
      degree: "Bachelor in Marketing",
      startDate: "2014",
      endDate: "2018",
    },
  ],
  isLocked: false,
  isSearchable: true,
};

export function CompactResumePreview({
  data,
  lastEdited,
  onEdit,
  onDelete,
  onDuplicate,
  onReview,
  onMove,
  onSearchableChange,
  resume,
}: CompactResumePreviewProps) {
  return (
    <Card className="group relative flex h-[290px] w-[240px] flex-col overflow-hidden border border-gray-200 bg-white shadow-sm">
      <div className="relative flex-grow">
        {/* Resume Preview Content */}
        <div className="absolute inset-0 p-4">
          <div className="h-[450%] w-[450%] origin-top-left scale-[0.22] transform">
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 text-3xl font-bold">
                  {data.header.fullName}
                </h2>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-gray-600">
                  <span>{data.header.email}</span>
                  <span>•</span>
                  <span>{data.header.phone}</span>
                  <span>•</span>
                  <span>{data.header.location}</span>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">SUMMARY</h3>
                <p className="text-gray-600">{data.summary}</p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">EXPERIENCE</h3>
                {data.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium">{exp.position}</p>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-600">
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="mt-1 text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hover Actions Overlay */}
        <div className="invisible absolute inset-0 flex items-center justify-center gap-4 bg-gray-900/70 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <Button
            onClick={onEdit}
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
          >
            <Settings className="h-6 w-6" />
          </Button>
          <Button
            onClick={onDelete}
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

      {/* Resume Info Footer */}
      <div className="flex items-center justify-between border-t bg-white p-3">
        <div className="flex flex-col">
          <span className="max-w-[160px] truncate text-sm font-medium">
            {data.resumeTitle}
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
            <DropdownMenuItem onSelect={onEdit}>
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
            <DropdownMenuItem onSelect={onDelete} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Deletar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-sm">Searchable</span>
              <Switch
                checked={data.isSearchable}
                onCheckedChange={onSearchableChange}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}

export const ResumeGrid = () => {
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  const resumes = api.resume.list.useQuery();

  return (
    <>
      {resumes?.data?.map((resume) => (
        <CompactResumePreview
          key={resume.id}
          data={fakeUserData}
          resume={resume}
          lastEdited="two hours ago"
        />
      ))}

      <DeleteResume
        open={!!selectedResume}
        onOpenChange={() => setSelectedResume(null)}
        resume={selectedResume}
      />
    </>
  );
};

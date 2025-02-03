"use client";

import { useEffect, useState } from "react";

import { useSidebar } from "~/components/ui/sidebar";
import { ResumeButtonGroup } from "~/components/resume-button-group";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Section {
  id: string;
  label: string;
  required: boolean;
  removable: boolean;
  added: boolean;
}

const initialSections: Section[] = [
  {
    id: "contact",
    label: "Contato",
    required: true,
    removable: false,
    added: true,
  },
  {
    id: "experience",
    label: "Experiência",
    required: true,
    removable: false,
    added: true,
  },
  {
    id: "education",
    label: "Educação",
    required: true,
    removable: false,
    added: true,
  },
  {
    id: "summary",
    label: "Sumário",
    required: false,
    removable: false,
    added: true,
  },
  {
    id: "courses",
    label: "Cursos",
    required: false,
    removable: true,
    added: false,
  },
  {
    id: "projects",
    label: "Projetos",
    required: false,
    removable: true,
    added: false,
  },
  {
    id: "skills",
    label: "Habilidades",
    required: false,
    removable: true,
    added: true,
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; params: any }>) {
  const { setOpen } = useSidebar();
  const params = useParams<{ id: string }>();

  const [sections, setSections] = useState<Section[]>(initialSections);
  const [currentSection, setCurrentSection] = useState("contact");

  const resume = api.resumes.get.useQuery(params.id);

  // console.log("resume", resume.data);

  const handleNavigate = (sectionId: string) => {
    setCurrentSection(sectionId);
  };

  const handleToggleSection = (sectionId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, added: !section.added }
          : section,
      ),
    );
  };

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div className="mt-3 flex min-h-screen w-full flex-col items-center justify-between">
      <div className="w-full flex-1 p-4">{children}</div>
    </div>
  );
}

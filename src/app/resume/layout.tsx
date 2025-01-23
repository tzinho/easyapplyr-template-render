"use client";

import { useEffect, useState } from "react";
import {
  BookDashed,
  Contact,
  Download,
  Languages,
  List,
  Workflow,
} from "lucide-react";

import { useSidebar } from "~/components/ui/sidebar";
import { ResumeButtonGroup } from "~/components/resume-button-group";

const steps = [
  {
    label: "Contato",
    description: "What's the best way for employers to reach you?",
    icon: <Contact size={14} />,
    href: "/contact",
  },
  {
    label: "Educação",
    description: "What's the best way for employers to reach you?",
    icon: <Languages size={14} />,
    href: "/education",
  },
  {
    label: "Experiências",
    description: "What's the best way for employers to reach you?",
    icon: <BookDashed size={14} />,
    href: "/experiences",
  },
  {
    label: "Habilidades",
    description: "What's the best way for employers to reach you?",
    icon: <Workflow size={14} />,
    href: "/skills",
  },
  {
    label: "Sumário",
    description: "What's the best way for employers to reach you?",
    icon: <List size={14} />,
    href: "/summary",
  },
  {
    label: "Formatar & Download",
    description: "What's the best way for employers to reach you?",
    icon: <Download size={14} />,
    href: "/format",
  },
];

const initialSections: any[] = [
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
}: Readonly<{ children: React.ReactNode }>) {
  const { setOpen } = useSidebar();

  const [sections, setSections] = useState(initialSections);
  const [currentSection, setCurrentSection] = useState("contact");

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
      {/* <Stepper steps={steps} /> */}
      <ResumeButtonGroup
        sections={sections}
        currentSection={currentSection}
        onNavigate={handleNavigate}
        onToggleSection={handleToggleSection}
      />
      <div className="w-full flex-1 p-4">{children}</div>
    </div>
  );
}

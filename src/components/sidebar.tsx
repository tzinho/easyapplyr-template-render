import { useState } from "react";
import {
  User,
  Briefcase,
  Award,
  GraduationCap,
  BookOpen,
  List,
  Trash2,
} from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export type ResumeSection = {
  id: string;
  title: string;
  icon: string;
  isActive: boolean;
  isRequired?: boolean;
};

export type FormData = Record<string, any>;

export const PREDEFINED_SECTIONS = {
  CONTACT: "contact",
  EXPERIENCES: "experiences",
  SKILLS: "skills",
  EDUCATION: "education",
  SUMMARY: "summary",
  COURSES: "courses",
} as const;

export type PredefinedSectionType =
  (typeof PREDEFINED_SECTIONS)[keyof typeof PREDEFINED_SECTIONS];

const defaultSections: ResumeSection[] = [
  {
    id: PREDEFINED_SECTIONS.CONTACT,
    title: "Contact Information",
    icon: "user",
    isActive: true,
    isRequired: true,
  },
  {
    id: PREDEFINED_SECTIONS.EXPERIENCES,
    title: "Work Experience",
    icon: "briefcase",
    isActive: true,
    isRequired: true,
  },
  {
    id: PREDEFINED_SECTIONS.EDUCATION,
    title: "Education",
    icon: "graduation-cap",
    isActive: true,
    isRequired: true,
  },
  {
    id: PREDEFINED_SECTIONS.SKILLS,
    title: "Skills",
    icon: "award",
    isActive: true,
    isRequired: true,
  },
  {
    id: PREDEFINED_SECTIONS.SUMMARY,
    title: "Professional Summary",
    icon: "book-open",
    isActive: false,
  },
  {
    id: PREDEFINED_SECTIONS.COURSES,
    title: "Courses & Certifications",
    icon: "list",
    isActive: false,
  },
];

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    user: User,
    briefcase: Briefcase,
    "graduation-cap": GraduationCap,
    award: Award,
    "book-open": BookOpen,
    list: List,
  };
  return icons[iconName] || User;
};

interface ResumeSidebarProps {
  activeSection: PredefinedSectionType;
  onSectionChange: (sectionId: PredefinedSectionType) => void;
}

export const ResumeSidebar = ({
  activeSection,
  onSectionChange,
}: ResumeSidebarProps) => {
  const [sections, setSections] = useState<ResumeSection[]>(defaultSections);

  const getAvailableSections = () => {
    return defaultSections.filter(
      (defaultSection) =>
        !sections.some((section) => section.id === defaultSection.id),
    );
  };

  const handleAddSection = (sectionId: string) => {
    const sectionToAdd = defaultSections.find(
      (section) => section.id === sectionId,
    );
    if (sectionToAdd) {
      setSections([...sections, sectionToAdd]);
    }
  };

  const removeSection = (sectionId: PredefinedSectionType) => {
    const sectionToRemove = sections.find(
      (section) => section.id === sectionId,
    );

    if (sectionToRemove?.isRequired) {
      console.log("Cannot remove required section");
      return;
    }

    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const availableSections = getAvailableSections();

  return (
    <div className="flex h-screen w-80 flex-col border-r border-border bg-sidebar p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Resume Sections</h2>
        {availableSections.length > 0 && (
          <Select onValueChange={handleAddSection}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Add section" />
            </SelectTrigger>
            <SelectContent>
              {availableSections.map((section) => (
                <SelectItem key={section.id} value={section.id}>
                  {section.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {sections.map((section) => {
          const IconComponent = getIconComponent(section.icon);
          return (
            <div key={section.id} className="group flex items-center">
              <Button
                variant={activeSection === section.id ? "secondary" : "ghost"}
                className={cn(
                  "h-12 w-full justify-start gap-2",
                  activeSection === section.id && "bg-accent",
                )}
                onClick={() =>
                  onSectionChange(section.id as PredefinedSectionType)
                }
              >
                <IconComponent className="h-5 w-5" />
                <span>{section.title}</span>
                {section.isRequired && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    Required
                  </span>
                )}
              </Button>
              {!section.isRequired && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() =>
                    removeSection(section.id as PredefinedSectionType)
                  }
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

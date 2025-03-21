import { type Resume } from "~/stores/resume-store";

export interface Section {
  id: string;
  type:
    | "contact"
    | "summary"
    | "skills"
    | "experiences"
    | "educations"
    | "languages"
    | "certifications"
    | "courseworks"
    | "projects"
    | "involvements";
  order: number;
  disabled: boolean;
  appear: boolean;
  title?: string;
  column?: 1 | 2;
  removable: boolean;
  required: boolean;
  label?: string;
  data?: {
    text?: string;
    items?: ItemType[];
  };
}

export interface Experience {
  id: string;
  title: string;
  order: number;
  [key: string]: string | number | boolean | undefined;
}

export interface Skill {
  id: string;
  title: string;
  order: number;
  [key: string]: string | number | boolean | undefined;
}

export interface ItemType {
  id: string;
  order: number;
  appear?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface Settings {
  fontSize: number;
  primaryColor: string;
  fontFamily: string;
  paperSize: "A4" | "Letter";
  showIcons: boolean;
  sectionSpacing: number;
  lineHeight: number;
  indent: boolean;
  showSeparators: boolean;
  letterSpacing: number;
}

export interface Template {
  id: string;
  title: string;
  component: ({
    resumeTemplate,
  }: {
    resumeTemplate: Resume;
    isPreview?: boolean;
  }) => JSX.Element;
  defaultSections: Section[];
  categories: string[];
  isPro: boolean;
  settings: Settings;
}

export interface Skill {
  id: string;
  order: number;
  title: string;
  appear: boolean;
}

export interface Experience {
  id: string;
  order: number;
  appear: boolean;
  role: string;
  company: string;
  where: string;
  did: string;
}

export interface ResumeType {
  id: string;
  title: string;
  updatedAt: Date;
  createdAt: Date;
  templateId: string;
}

export interface NavigationProps {
  sections: Section[];
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  onToggleSection: (sectionId: string) => void;
}

export interface SectionProps {
  section: Section;
  resumeTemplate: Resume;
  isPreview?: boolean;
}

export interface Contact {
  name: string;
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  personal?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  order?: string | null;
}

export interface Education {
  id: string;
  degree?: string;
  order: number;
  appear: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface Summary {
  text: string;
}

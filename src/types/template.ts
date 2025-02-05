export interface SectionType {
  id: string;
  type:
    | "contact"
    | "summary"
    | "skills"
    | "experiences"
    | "education"
    | "certifications"
    | "courses"
    | "projects"
    | "involvements"
    | "educations";
  order: number;
  disabled?: boolean;
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

export interface ExperienceType {
  id: string;
  title: string;
  order: number;
  [key: string]: string | number | boolean | undefined;
}

export interface SkillType {
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

export interface Template {
  id: string;
  title: string;
  component: () => JSX.Element;
  defaultSections: SectionType[];
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

export interface Resume {
  id: string;
  title: string;
  updatedAt: Date;
  createdAt: Date;
  templateId: string;
}

export interface NavigationProps {
  sections: SectionType[];
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  onToggleSection: (sectionId: string) => void;
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

export interface Summary {
  text: string;
}

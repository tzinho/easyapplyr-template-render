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
    | "involvements";
  order: number;
  disabled?: boolean;
  column?: 1 | 2;
}

export interface ExperienceType {
  id: string;
  title: string;
  order: number;
}

export interface SkillType {
  id: string;
  title: string;
  order: number;
}

export interface ItemType {
  order: number;
}

export interface Template {
  id: string;
  title: string;
  component: () => JSX.Element;
}

export interface Resume {
  id: string;
  title: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Skill {
  id: string;
  order: number;
  title: string;
  appear: boolean;
}

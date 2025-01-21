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
  column?: "column1" | "column2";
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


export interface Experience {
  id: string;
  order: number;
  appear: boolean;
  role: string;
  company: string;
  where: string;
  did: string;
}
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
  column?: 'column1' | 'column2'
}

export interface ExperienceType {
  id: string;
  title: string;
  order: number
}

export interface SkillType {
  id: string;
  title: string;
  order: number
}

export interface ItemType {
  order: number;
}
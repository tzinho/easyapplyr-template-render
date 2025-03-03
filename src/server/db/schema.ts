// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTableCreator,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const resumes = createTable("resume", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  experience: smallint("experience"),
  templateId: text("templateId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  url: text("url"),
});

export const contacts = createTable("contact", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text("resumeId")
    .notNull()
    .unique()
    .references(() => resumes.id, { onDelete: "cascade" }),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  linkedin: text("linkedin"),
  personal: text("personal"),
  country: text("country"),
  state: text("state"),
  city: text("city"),
});

export const summaries = createTable("summary", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text("resumeId")
    .notNull()
    .unique()
    .references(() => resumes.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
});

export const experiences = createTable("experience", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text("resumeId")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  company: text("company").notNull(),
  where: text("where"),
  did: text("did"),
  appear: boolean("appear").notNull(),
  order: integer("order").notNull(),
  startAt: date("startAt"),
  endAt: date("endAt"),
});

export const projects = createTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text("resumeId")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" }),
  title: text("name").notNull(),
  organization: text("organization"),
  url: text("url"),
  appear: boolean("appear").default(true),
  order: integer("order").notNull(),
  startAt: date("startAt"),
  endAt: date("endAt"),
});

export const educations = createTable("education", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text("resumeId")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" }),
  degree: text("degree").notNull(),
  institution: text("institution"),
  where: text("where"),
  description: text("description"),
  appear: boolean("appear").default(true),
  order: integer("order").notNull(),
  startAt: date("startAt"),
  endAt: date("endAt"),
});

export const certifications = createTable("certification", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text("resumeId")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" }),
  name: text("name"),
  where: text("where"),
  when: text("when"),
  description: text("description"),
  appear: boolean("appear").default(true),
  startAt: date("startAt"),
  endAt: date("endAt"),
  order: integer("order").notNull(),
});

export const courseworks = createTable("coursework", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text("resumeId")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" }),
  name: text("name"),
  where: text("where"),
  appear: boolean("appear").default(true),
  order: integer("order").notNull(),
  startAt: date("startAt"),
  endAt: date("endAt"),
});

export const skills = createTable("skill", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text("resumeId")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  appear: boolean("appear").default(true),
  order: integer("order").notNull(),
});

export const languages = createTable("language", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text("resumeId")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  appear: boolean("appear").default(true),
  order: integer("order").notNull(),
});

export const sections = createTable("section", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text("resumeId")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  title: text("title"),
  disabled: boolean("disabled"),
  removable: boolean("removable"),
  appear: boolean("appear").notNull(),
  column: integer("column").notNull(),
  order: integer("order").notNull(),
});

export const settings = createTable("setting", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text("resumeId")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" }),
  fontSize: integer("fontSize").notNull(),
  primaryColor: text("primaryColor").notNull(),
});

// Relations

export const summariesRelations = relations(summaries, ({ one }) => ({
  resume: one(resumes, {
    fields: [summaries.resumeId],
    references: [resumes.id],
  }),
}));

export const courseworkRelations = relations(courseworks, ({ one }) => ({
  resume: one(resumes, {
    fields: [courseworks.resumeId],
    references: [resumes.id],
  }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  resume: one(resumes, {
    fields: [skills.resumeId],
    references: [resumes.id],
  }),
}));

export const experiencesRelations = relations(experiences, ({ one }) => ({
  resume: one(resumes, {
    fields: [experiences.resumeId],
    references: [resumes.id],
  }),
}));

export const languageRelations = relations(languages, ({ one }) => ({
  resume: one(resumes, {
    fields: [languages.resumeId],
    references: [resumes.id],
  }),
}));

export const sectionsRelations = relations(sections, ({ one }) => ({
  resume: one(resumes, {
    fields: [sections.resumeId],
    references: [resumes.id],
  }),
}));

export const settingsRelations = relations(settings, ({ one }) => ({
  resume: one(resumes, {
    fields: [settings.resumeId],
    references: [resumes.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  resume: one(resumes, {
    fields: [projects.resumeId],
    references: [resumes.id],
  }),
}));

export const educationsRelations = relations(educations, ({ one }) => ({
  resume: one(resumes, {
    fields: [educations.resumeId],
    references: [resumes.id],
  }),
}));

export const certificationsRelations = relations(certifications, ({ one }) => ({
  resume: one(resumes, {
    fields: [certifications.resumeId],
    references: [resumes.id],
  }),
}));

export const contactsRelations = relations(contacts, ({ one }) => ({
  resume: one(resumes, {
    fields: [contacts.resumeId],
    references: [resumes.id],
  }),
}));

export const resumeRelations = relations(resumes, ({ many, one }) => ({
  experiences: many(experiences),
  projects: many(projects),
  educations: many(educations),
  certifications: many(certifications),
  courseworks: many(courseworks),
  summary: one(summaries),
  skills: many(skills),
  contact: one(contacts),
  languages: many(languages),
  settings: one(settings),
  sections: many(sections),
}));

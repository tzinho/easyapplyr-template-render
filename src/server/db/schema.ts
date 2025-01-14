// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `easyapplyr-template-render_${name}`);

export const resumes = createTable('resume', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
})

export const contacts = createTable('contact', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text('resumeId')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  name: text('name'),
  email: text('email'),
  phone: text('phone'),
  linkedin: text('linkedin'),
  personal: text('personal'),
  country: text('country'),
  state: text('state'),
  city: text('city'),
  column: integer('column'),
  order: integer('order'),
})

export const contactsRelations = relations(contacts, ({ one }) => ({
  resume: one(resumes, {
    fields: [contacts.resumeId],
    references: [resumes.id],
  }),
}))

export const experiences = createTable('experience', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text('resumeId')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  role: text('role'),
  company: text('company'),
  where: text('where'),
  did: text('did'),
  appear: boolean('appear'),
  column: integer('column'),
  order: integer('order'),
})

export const experiencesRelations = relations(experiences, ({ one }) => ({
  resume: one(resumes, {
    fields: [experiences.resumeId],
    references: [resumes.id],
  }),
}))

export const projects = createTable('project', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text('resumeId')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  appear: boolean('appear'),
  column: integer('column'),
  order: integer('order'),
})

export const projectsRelations = relations(projects, ({ one }) => ({
  resume: one(resumes, {
    fields: [projects.resumeId],
    references: [resumes.id],
  }),
}))

export const educations = createTable('education', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text('resumeId')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  appear: boolean('appear'),
  column: integer('column'),
  order: integer('order'),
})

export const educationsRelations = relations(educations, ({ one }) => ({
  resume: one(resumes, {
    fields: [educations.resumeId],
    references: [resumes.id],
  }),
}))

export const certifications = createTable('certification', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text('resumeId')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  appear: boolean('appear'),
  column: integer('column'),
  order: integer('order'),
})

export const certificationsRelations = relations(certifications, ({ one }) => ({
  resume: one(resumes, {
    fields: [certifications.resumeId],
    references: [resumes.id],
  }),
}))

export const courseworks = createTable('coursework', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text('resumeId')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  appear: boolean('appear'),
  column: integer('column'),
  order: integer('order'),
})

export const courseworkRelations = relations(courseworks, ({ one }) => ({
  resume: one(resumes, {
    fields: [courseworks.resumeId],
    references: [resumes.id],
  }),
}))

export const involvements = createTable('involvement', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text('resumeId')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  role: text('role'),
  organization: text('organization'),
  appear: boolean('appear'),
  column: integer('column'),
  order: integer('order'),
})

export const involvementRelations = relations(involvements, ({ one }) => ({
  resume: one(resumes, {
    fields: [involvements.resumeId],
    references: [resumes.id],
  }),
}))

export const skills = createTable('skill', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text('resumeId')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  text: text('text'),
  appear: boolean('appear'),
  column: integer('column'),
  order: integer('order'),
})

export const skillsRelations = relations(skills, ({ one }) => ({
  resume: one(resumes, {
    fields: [skills.resumeId],
    references: [resumes.id],
  }),
}))

export const summaries = createTable('summary', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text('resumeId')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  summary: text('summary'),
  appear: boolean('appear'),
  column: integer('column'),
  order: integer('order'),
})

export const summaryRelations = relations(summaries, ({ one }) => ({
  resume: one(resumes, {
    fields: [summaries.resumeId],
    references: [resumes.id],
  }),
}))

export const languages = createTable('language', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  resumeId: text('resumeId')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  appear: boolean('appear'),
  column: integer('column'),
  order: integer('order'),
})

export const languageRelations = relations(languages, ({ one }) => ({
  resume: one(resumes, {
    fields: [languages.resumeId],
    references: [resumes.id],
  }),
}))

export const resumeRelations = relations(resumes, ({ many, one }) => ({
  experiences: many(experiences),
  projects: many(projects),
  educations: many(educations),
  certifications: many(certifications),
  courseworks: many(courseworks),
  involvements: many(involvements),
  skills: many(skills),
  contact: one(contacts),
  languages: many(languages),
}))

export const templates = createTable('templates', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
})


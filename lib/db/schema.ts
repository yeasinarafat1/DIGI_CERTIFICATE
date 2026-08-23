
import { boolean, date, integer, jsonb, numeric, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// db/schema.ts
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type User = typeof user.$inferSelect;

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  studentId: varchar('student_id', { length: 30 }).unique().notNull(),
  name: text('name').notNull(),
  courseName: text('course_name').notNull(),
  batchNo: varchar('batch_no', { length: 20 }).notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
export type Student = typeof students.$inferSelect;


export const certificates = pgTable('certificates', {
  id: serial('id').primaryKey(),
  certificateId: varchar('certificate_id', { length: 30 }).unique().notNull(),
  name: text('name').notNull(),
  
  // THE NEW FIELD: defaults to 'student' so existing data doesn't break
  role: varchar('role', { length: 20 }).notNull().default('student'), 
  
  courseName: text('course_name').notNull(),
  batchNo: varchar('batch_no', { length: 20 }).notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Certificate = typeof certificates.$inferSelect;


export const mentors = pgTable('mentors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  roleTitle: varchar('role_title', { length: 255 }), 
  designation: varchar('designation', { length: 255 }), 
  yearsExperience: integer('years_experience').default(0),
  studentsCoached: integer('students_coached').default(0),
  rating: numeric('rating', { precision: 2, scale: 1 }).default('0.0'),
  biography: text('biography'),
  specialties: jsonb('specialties').$type<string[]>().default([]),
  avatarUrl: varchar('avatar_url', { length: 512 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
export type Mentor = typeof mentors.$inferSelect;

import { pgTable,serial,varchar,text,timestamp,date } from "drizzle-orm/pg-core";

// db/schema.ts
export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
export type Admin = typeof admins.$inferSelect;


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
// src/db/schema.ts
import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, doublePrecision, json } from 'drizzle-orm/pg-core';

// Define the 'users' table.
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(), // Make email unique for login
  passwordHash: text('password_hash').notNull(), // Store bcrypt hash
  preset: text('preset'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Since GreenPulse tracks footprint, commits, and activity
export const commits = pgTable('commits', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  nudgeId: text('nudge_id').notNull(),
  nudgeTitle: text('nudge_title').notNull(),
  co2Saved: doublePrecision('co2_saved').notNull(),
  coBenefitValue: text('co_benefit_value'),
  coBenefitType: text('co_benefit_type'),
  date: timestamp('date').defaultNow(),
});

export const progress = pgTable('progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  baseline: doublePrecision('baseline').notNull().default(0),
  currentEstimated: doublePrecision('current_estimated').notNull().default(0),
  totalSavedKg: doublePrecision('total_saved_kg').notNull().default(0),
  streak: integer('streak').notNull().default(0),
  achievements: json('achievements').default('[]'),
});

// Define relationships
export const usersRelations = relations(users, ({ many, one }) => ({
  commits: many(commits),
  progress: one(progress, {
    fields: [users.id],
    references: [progress.userId],
  }),
}));

export const commitsRelations = relations(commits, ({ one }) => ({
  author: one(users, {
    fields: [commits.userId],
    references: [users.id],
  }),
}));

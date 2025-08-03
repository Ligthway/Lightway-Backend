import {pgTable, uuid, varchar, timestamp, text, boolean, pgEnum} from 'drizzle-orm/pg-core';
export const userRoleEnum = pgEnum('user_role', ['admin', 'user', 'guest']);
export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }).notNull(),
    role: userRoleEnum('role').default('guest'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    isActive: boolean('is_active').default(true),
    lastLogin: timestamp('last_login'),
});

export const refreshTokens = pgTable('refresh_tokens', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id),
    token: text('token').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    expiresAt: timestamp('expires_at').notNull(),
});
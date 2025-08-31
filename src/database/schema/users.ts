import {Roles} from '@common/enums/roles.enum';
import {
  pgEnum,
  pgTable,
  integer,
  text
} from 'drizzle-orm/pg-core';
import {organizations} from './organizations';

export const userRoleEnum = pgEnum('user_role', [Roles.EndUser, Roles.LocationManager, Roles.OrganizationAdmin]);

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: text('email').notNull().unique(),
  password: text('password_hash').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  userName: text('username').notNull().unique(),
  role: userRoleEnum('role').notNull(),
  organizationId: integer('organization_id').references(() => organizations.id),
});

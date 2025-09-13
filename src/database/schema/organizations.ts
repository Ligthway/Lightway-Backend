import { serial, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import {users} from '@schema/users';

export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  adminId: integer('admin_id')
    .notNull()
    .references(() => users.id),
});
import { serial, varchar, integer, text } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import {organizations} from '@schema/organizations';

export const locations = pgTable('locations', {

  id: serial('id').primaryKey(),

  name: varchar('name', { length: 255 }).notNull().unique(),

  address: text('address').unique(),

  floorCount: integer('floor_count').default(1),

  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
});
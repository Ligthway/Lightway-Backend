import { serial, varchar, integer, text } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import {locations} from '@schema/locations';
import {users} from '@schema/users';
import { primaryKey } from 'drizzle-orm/pg-core';

export const locationManagerAssignments = pgTable('location_manager_assignments', {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    locationId: integer('location_id')
      .notNull()
      .references(() => locations.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.locationId] }),
    };
  }
);

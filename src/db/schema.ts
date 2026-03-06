import { index, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
  },
  (table) => [index("name_index").on(table.name)],
);

export const emailsTable = pgTable(
  "emails",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer().references(() => usersTable.id),
    subject: varchar({ length: 255 }),
    body: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    index("idx_emails_user_id").on(table.user_id),
    index("idx_emails_user_created").on(table.user_id, table.created_at.desc()),
  ],
);
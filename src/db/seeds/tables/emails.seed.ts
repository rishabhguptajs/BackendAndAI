import { db } from "../../client.js";
import { emailsTable } from "../../schema.js";
import type { SeedFn } from "../types.js";
import type { UsersSeedOut } from "./users.seed.js";

export type EmailsSeedIn = UsersSeedOut;

export const seedEmails = (input: EmailsSeedIn): SeedFn => {
  return async (ctx) => {
    const pick = (name: string) => {
      const u = input.usersByName.get(name);
      if (!u) throw new Error(`Missing seeded user: ${name}`);
      return u.id;
    };

    const emails =
      ctx.mode === "test"
        ? [
            {
              user_id: pick("Test User"),
              subject: "Welcome",
              body: "Test email body",
              created_at: ctx.now,
            },
          ]
        : [
            {
              user_id: pick("Rishabh"),
              subject: "Hello",
              body: "First seeded email",
              created_at: ctx.now,
            },
            {
              user_id: pick("Aanya"),
              subject: "Update",
              body: "Second seeded email",
              created_at: ctx.now,
            },
          ];

    await db.insert(emailsTable).values(emails);
    return {};
  };
};
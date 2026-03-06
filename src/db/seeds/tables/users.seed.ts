import { db } from "../../client.js";
import { usersTable } from "../../schema.js";
import type { SeedFn } from "../types.js";

export type UsersSeedOut = {
    usersByName: Map<string, { id: number; name: string }>;
  };

  export const seedUsers: SeedFn<UsersSeedOut> = async (ctx) => {
    const baseUsers =
      ctx.mode === "test"
        ? [{ name: "Test User", age: 20 }]
        : [
            { name: "Rishabh", age: 24 },
            { name: "Aanya", age: 22 },
            { name: "Dev", age: 30 },
          ];
  
    // NOTE: This is "insert-only". If you need idempotent re-runs without duplicates,
    // add a UNIQUE key (like email) and switch to upsert/on-conflict.
    const inserted = await db
      .insert(usersTable)
      .values(baseUsers)
      .returning({ id: usersTable.id, name: usersTable.name });
  
    const usersByName = new Map(inserted.map((u) => [u.name, u]));
    return { usersByName };
  };
import "dotenv/config";
import { sql } from "drizzle-orm";
import { db, pool } from "../client.js";
import { emailsTable, usersTable } from "../schema.js";
import type { SeedContext, SeedMode } from "./types.js";
import { seedUsers } from "./tables/users.seed.js";
import { seedEmails } from "./tables/emails.seed.js";

function parseMode(): SeedMode {
    const v = (process.env.SEED_MODE ?? "dev").toLowerCase();
    if (v === "dev" || v === "test" || v === "staging") return v;
    throw new Error(`Invalid SEED_MODE: ${v}`);
  }

  function parseReset(): boolean {
    return (process.env.SEED_RESET ?? "false").toLowerCase() === "true";
  }

  async function resetIfNeeded(reset: boolean) {
    if (!reset) return;
  
    // Stepwise + constraint-safe:
    // - truncate children first, then parents
    // - restart identities so ids are predictable in dev/test
    await db.execute(sql`TRUNCATE TABLE ${emailsTable} RESTART IDENTITY;`);
    await db.execute(sql`TRUNCATE TABLE ${usersTable} RESTART IDENTITY;`);
  }


  async function main() {
    const ctx: SeedContext = {
      mode: parseMode(),
      now: new Date(),
    };
  
    const reset = parseReset();
  
    try {
      await db.transaction(async () => {
        await resetIfNeeded(reset);
  
        // Step 1 (parents)
        const usersOut = await seedUsers(ctx);
  
        // Step 2 (children)
        await seedEmails(usersOut)(ctx);
      });
  
      // eslint-disable-next-line no-console
      console.log(`Seeding complete (mode=${ctx.mode}, reset=${reset})`);
    } finally {
      await pool.end();
    }
  }


  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
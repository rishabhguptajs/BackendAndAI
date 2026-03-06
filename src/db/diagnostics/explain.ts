import "dotenv/config";
import { sql } from "drizzle-orm";
import { db, pool } from "../client.js";

const sqlQuery = sql`EXPLAIN ANALYZE
        SELECT * FROM emails
        WHERE user_id = 112
        ORDER BY created_at DESC`;

async function explainEmailsQuery() {
  const result = await db.execute(sqlQuery);
  console.log("Query plan:");
  result.rows.forEach((row) => console.log(row["QUERY PLAN"]));
}

await explainEmailsQuery();
await pool.end();

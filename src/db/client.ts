import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!connectionString) throw new Error("Missing DATABASE_URL (or POSTGRES_URL)");

export const pool = new Pool({ connectionString });
export const db = drizzle(pool);
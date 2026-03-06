// here will be all the express app configuration

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
const db = drizzle(process.env.DATABASE_URL!);


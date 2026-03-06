# Timeline

This file is a **chronological log** of what I worked on and learned in this repo. Newer entries appear at the top.

---

## Mar 7, 2026

**Topics:** Drizzle ORM, PostgreSQL, Express  
**What I did:**  
- Set up a basic TypeScript + Node.js + Express backend skeleton.  
- Designed the initial PostgreSQL schema and migrations with Drizzle ORM (`users` and `emails` tables).  
- Added useful indexes and seeding to support realistic queries and data.  
- Started a small diagnostics helper using `EXPLAIN` to inspect Postgres query plans.

**What I learned / focused on:**  
- How Drizzle ORM models tables, relationships, and migrations in TypeScript while staying close to SQL.  
- Why indexes (including composite ones) matter for realistic access patterns.  
- How `drizzle-kit` keeps the database schema in sync with the codebase.  
- A simple, clean folder structure for a small backend project (config, routes, controllers, models, db).

---


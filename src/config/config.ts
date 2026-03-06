// basically to load the environment variables and use them throughout the codebase

import dotenv from "dotenv";

interface Config {
    port: number;
    nodeEnv: string;
    postgresUrl: string;
}

dotenv.config();

const config: Config = {
    port: parseInt(process.env.PORT || "8080"),
    nodeEnv: process.env.NODE_ENV || "development",
    postgresUrl: process.env.POSTGRES_URL || "postgresql://admin:admin@localhost:5432/projects",
}

export default config;
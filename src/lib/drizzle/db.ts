import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema"
import postgres from "postgres";

if(!process.env.DATABASE_URL) throw new Error('Missing database dependency');

const client = postgres(process.env.DATABASE_URL, { max : 1});
export const db = drizzle(client, { schema });
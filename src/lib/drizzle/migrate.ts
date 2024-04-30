import {drizzle} from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import "dotenv/config";

if(!process.env.DATABASE_URL) throw new Error('Missing database dependency')
const migrationClient = postgres(process.env.DATABASE_URL , {max:1});

async function main(){
    await migrate(drizzle(migrationClient), {
        migrationsFolder: "./src/lib/drizzle/migrations",
    })
    await migrationClient.end();
}

main();
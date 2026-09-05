
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from './schema';
type Database = ReturnType<typeof drizzle>;

let db_uri: Database | undefined;

// export const db = () => {
//   if (db_uri) {
//     return db_uri;
//   }

//   const databaseUrl = process.env.DATABASE_URL;

//   if (!databaseUrl) {
//     throw new Error("DATABASE_URL is not set");
//   }

//   const sql = neon(databaseUrl);
//   db_uri = drizzle({ client: sql });

//   return db_uri;
// };

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, });
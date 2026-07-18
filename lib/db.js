import { neon } from '@neondatabase/serverless';

// Prevents establishing multiple redundant connection pools during development hot-reloads
if (!global.sql) {
  global.sql = neon(process.env.DATABASE_URL);
}

const sql = global.sql;
export default sql;

import Database from 'better-sqlite3';
import { DATABASE_URL } from '$env/static/private';

// Better Auth's Kysely adapter accepts a better-sqlite3 instance directly.
export const db = new Database(DATABASE_URL);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

import { Database } from 'bun:sqlite';
import { env } from '$env/dynamic/private';

export const db = new Database(env.DATABASE_URL, { create: true, safeIntegers: true });

db.prepare('PRAGMA foreign_keys = ON').run();
db.prepare('PRAGMA trusted_schema = 1').run();

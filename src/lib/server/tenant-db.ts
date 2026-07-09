import { Database } from 'bun:sqlite';

export function getTenantDb(id: number) {
  const path = `./storage/tenants/${id}.sqlite3`;
  const db = new Database(path, { create: true, safeIntegers: true });

  db.prepare('PRAGMA foreign_keys = ON').run();
  db.prepare('PRAGMA trusted_schema = 1').run();

  return db; 
}


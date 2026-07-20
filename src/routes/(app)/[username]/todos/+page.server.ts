import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const db = locals.db;
  const todos = db.query('SELECT * FROM todos ORDER BY id DESC').all();
  return { todos };
};

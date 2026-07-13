import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const db = locals.db;
  const todos = db.query('SELECT * FROM todos ORDER BY id DESC').all() as Todo[];

  return { todos };
};

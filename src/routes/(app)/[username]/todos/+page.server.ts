import type { PageServerLoad, Actions } from './$types';
import { getTenantDb } from '$lib/server/tenant-db';

export const load: PageServerLoad = async ({ locals }) => {
  const userId = locals.user?.id;
  const db = getTenantDb(userId);
  const todos = db.query('SELECT * FROM todos ORDER BY id DESC').all() as Todo[];

  return { todos };
};

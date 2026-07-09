import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getTenantDb } from '$lib/server/tenant-db';
import { createRoutes } from '$lib/routes';

export const load: PageServerLoad = async ({ params, locals }) => {
  const userId = locals.user?.id;
  const db = getTenantDb(userId);

  const todo = db.query('SELECT * FROM todos WHERE id = ?').get(params.id);

  if (!todo) throw error(404, 'Todo not found');

  return { todo };
};

export const actions: Actions = {
  update: async ({ request, params, locals }) => {
    const data = await request.formData();
    const name = (data.get('name') as string)?.trim();
    const description = (data.get('description') as string)?.trim();

    if (!name) {
      return fail(400, { message: 'Name is required', title: name });
    }

    const userId = locals.user?.id;
    const db = getTenantDb(userId);

    db.query('UPDATE todos SET name = ?, description = ? WHERE id = ?').run(name, description, params.id);

    const username = locals?.user?.name;
    const routes = createRoutes(username);
    const route = routes.todos.index();    

    redirect(303, route); 
  },

  delete: async ({ params, locals }) => {
    const userId = locals.user?.id;
    const db = getTenantDb(userId);

    db.query('DELETE FROM todos WHERE id = ?').run(params.id);

    const routes = getContext('routes');
    const route = routes.todos.index();    

    redirect(303, route); 
  }
};

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getTenantDb } from '$lib/server/tenant-db';
import { createRoutes } from '$lib/routes';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const data = await request.formData();
    const name = (data.get('name') as string)?.trim();
    const description = (data.get('description') as string)?.trim();

    if (!name) {
      return fail(400, { message: 'Name is required', title: name });
    }

    const userId = locals.user?.id;
    const db = getTenantDb(userId);

    db.query('INSERT INTO todos (name, description) VALUES (?, ?)').run(name, description);

    const username = locals?.user?.name;
    const routes = createRoutes(username);
    const route = routes.todos.index();    

    redirect(303, route); 
  }
};

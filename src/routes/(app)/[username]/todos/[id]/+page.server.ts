import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { createRoutes } from '$lib/routes';

export const load: PageServerLoad = async ({ params, locals }) => {
  const todo = locals.db
    .query('SELECT * FROM todos WHERE id = ?')
    .get(params.id);

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

    locals.db
      .query('UPDATE todos SET name = ?, description = ? WHERE id = ?')
      .run(name, description, params.id);

    redirectToIndex(locals);
  },

  delete: async ({ params, locals }) => {
    locals.db
      .query('DELETE FROM todos WHERE id = ?')
      .run(params.id);

    redirectToIndex(locals);
  }
  
};

function redirectToIndex(locals: App.Locals) {
  const username = locals?.user?.name;
  const routes = createRoutes(username);
  const route = routes?.todos?.index();    

  redirect(303, String(route)); 
} 


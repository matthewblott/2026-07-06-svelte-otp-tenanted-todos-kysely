import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createRoutes } from '$lib/routes';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const name = form.get('name') as string;

    const result = await auth.api.updateUser({
      body: { name },
      headers: request.headers,
    });

    if(result.status) {
      const routes = createRoutes(name);
      const route = routes.account?.index()!;

      redirect(303, route);
    }

    const routes = createRoutes(locals?.user?.name);
    const route = routes.account?.index()!;

    redirect(303, route);

  },
};

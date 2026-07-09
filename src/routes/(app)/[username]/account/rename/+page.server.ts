import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createRoutes } from '$lib/routes';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const name = form.get('name') as string;

    await auth.api.updateUser({
      body: { name },
      headers: request.headers,
    });

    const username = locals?.user?.name;
    const routes = createRoutes(username);
    const route = routes.account?.index()!;

    redirect(303, route);
  },
};

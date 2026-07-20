import { auth } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { APIError } from 'better-auth';
import { createTenantRoutes } from '$lib/routes/tenant';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user

  if (user) {
    const username = user.name;
    const routes = createTenantRoutes(username);
    const route = routes.todos.index();
    redirect(302, route);
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
    let data;
    try {
      data = await auth.api.signInAnonymous({
        headers: request.headers
      });
    } catch (error) {
      if (error instanceof APIError) {
        return fail(400, { error: error.message });
      }
      throw error;
    }

    const username = data?.user?.name;
    const routes = createTenantRoutes(username);
    const route = routes.todos.index();

    redirect(303, route);

  },
};


import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createTenantRoutes } from '$lib/routes/tenant';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const email = String(form.get('email')).trim();
    const otp = String(form.get('otp')).trim();

    let data;
    try {
      data = await auth.api.signInEmailOTP({
        body: { email, otp },
        headers: request.headers,
      });
    } catch (error) {
      if (error instanceof APIError) {
        return fail(400, { error: error.message, email, step: 'email' });
      }
      throw error;
    }

    const username = data?.user?.name;
    const routes = createTenantRoutes(username);
    const route = routes.todos.index();

    redirect(303, route);
  },
};

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { auth } from '$lib/server/auth';
import { publicRoutes as routes } from '$lib/routes';

export const actions: Actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const email = String(form.get('email')).trim();

    try {
      await auth.api.sendVerificationOTP({
        body: {
          email: email,
          type: 'sign-in',
        },
        headers: event.request.headers,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send code.';
      return fail(400, { error: message, email, step: 'email' });
    }

    const route = `${routes.auth.verify()}?email=${encodeURIComponent(email)}`;

    // Redirect to verify page with email as query parameter
    redirect(303, route);
  },
};

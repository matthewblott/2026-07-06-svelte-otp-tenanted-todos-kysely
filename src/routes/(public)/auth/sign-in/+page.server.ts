import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { auth } from '$lib/server/auth';

export const actions: Actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const email = form.get('email');

    if (!email || typeof email !== 'string' || !email.trim()) {
      return fail(400, { error: 'Email is required', email: email ? email : '', step: 'email' });
    }

    const trimmedEmail = email.trim();

    try {
      await auth.api.sendVerificationOTP({
        body: {
          email: trimmedEmail,
          type: 'sign-in',
        },
        headers: event.request.headers,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send code.';
      return fail(400, { error: message, email: trimmedEmail, step: 'email' });
    }

    // Redirect to verify page with email as query parameter
    redirect(303, `/auth/verify?email=${encodeURIComponent(trimmedEmail)}`);
  },
};

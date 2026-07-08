import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { auth } from '$lib/server/auth';

export const actions: Actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const email = String(form.get('email'));
    const otp = String(form.get('otp'));

    const { locals, request } = event;

    try {
      await auth.api.signInEmailOTP({
        body: {
          email: email.trim(),
          otp: otp.trim(),
        },
        headers: event.request.headers,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid or expired code.';
      return fail(400, { error: message, email: email as string, otp: otp.toString() });
    }
    redirect(303, '/');
  },
};

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { publicRoutes as routes } from '$lib/routes';
// import { authClient as auth } from '$lib/auth-client';
import { auth } from '$lib/server/auth';

export const actions: Actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const email = String(form.get('email')).trim();

    // const { data, error } = await auth.emailOtp.sendVerificationOtp({
    //   email: email,
    //   type: "sign-in",
    // });

    try {
      const data = await auth.api.sendVerificationOTP({
        body: {
          email: email, // required
          type: "sign-in", // required
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send code.';
      return fail(400, { error: message, email, step: 'email' });
    }


    // if (error) {
    //   const message = error instanceof Error ? error.message : 'Failed to send code.';
    //   return fail(400, { error: message, email, step: 'email' });
    // }

    const route = `${routes.auth.verify()}?email=${encodeURIComponent(email)}`;

    // Redirect to verify page with email as query parameter
    redirect(303, route);
  },
};

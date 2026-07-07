import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const response = await auth.api.signOut({
      headers: request.headers,
      asResponse: true,
    });

    // Forward the Set-Cookie header(s) from Better Auth's response
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      // Better Auth's cookie name defaults to something like "better-auth.session_token"
      cookies.delete('better-auth.session_token', { path: '/' });
    }

    redirect(303, '/');
  },
};

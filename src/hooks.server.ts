import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';

// import { building } from '$foo'

export const handle: Handle = async ({ event, resolve }) => {
  // Populate locals so +layout.server.ts and actions can read the session.
  const session = await auth.api.getSession({ headers: event.request.headers });
  event.locals.session = session?.session ?? null;
  event.locals.user = session?.user ?? null;

  // return svelteKitHandler({ event, resolve, auth, building });
  return svelteKitHandler({ event, resolve, auth, building });
};

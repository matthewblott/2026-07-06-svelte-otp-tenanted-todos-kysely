import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { getTenantDb } from '$lib/server/tenant-db';

export const handle: Handle = async ({ event, resolve }) => {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return new Response('Down for maintenance, back in a moment.', { status: 503 })
  }

  const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  }

  if (session?.user) {
    event.locals.db = getTenantDb(Number(session.user.id));
  }

  const response = await svelteKitHandler({ event, resolve, auth, building });

  event.locals.db?.close()

  return response;
};

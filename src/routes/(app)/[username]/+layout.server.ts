import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, locals }) => {
  const session = locals.session;
  const user = locals.user!;

  if (!session) {
    throw redirect(303, '/sign-in');
  }

  if (user.name !== params.username) {
    throw error(403, 'Not your tenant');
  }

  // Todo: Get the tenant db
  // locals.db = getTenantDb(params.username); 

  // Actions don't go through the parent layout's load.
  // So for any +page.server.ts with actions,
  // re-check locals.session.user.username === params.username at the top of the action too.
  // It's a couple of lines, but skipping it is the classic way this kind of route-based tenancy gets bypassed.

  return { user };
};

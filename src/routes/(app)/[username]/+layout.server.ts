import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, locals }) => {
  const session = locals.session;
  const user = locals.user;

  if (!session) {
    throw redirect(303, '/sign-in');
  }

  if (user.name !== params.username) {
    throw error(403, 'Not your tenant');
  }

  return { user: session?.user };
};

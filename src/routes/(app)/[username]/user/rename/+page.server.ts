import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const name = form.get('name') as string;

    await auth.api.updateUser({
      body: { name },
      headers: request.headers,
    });

    redirect(303, '/');
  },
};

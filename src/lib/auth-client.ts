import { createAuthClient } from 'better-auth/svelte';
import { anonymousClient, emailOTPClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  plugins: [anonymousClient(), emailOTPClient()],
});

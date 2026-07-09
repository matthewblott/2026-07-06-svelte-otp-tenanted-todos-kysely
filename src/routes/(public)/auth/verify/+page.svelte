<script lang="ts">
  import { authClient as auth } from '$lib/auth-client';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { createRoutes } from '$lib/routes';

  let otp = $state('');
  let email = $state(page.url.searchParams.get('email') ?? '');

  async function verify() {
    const { data, error } = await auth.signIn.emailOtp({
      email,
      otp,
    });

    if (error) {
      // handle error, e.g. show a message
      return;
    }

    const username = data?.user?.name;
    const routes = createRoutes(username);
    const route = routes.user?.signOut.browser()!;

    goto(route);
  }
</script>

{email}
<form
  onsubmit={(e) => {
    e.preventDefault();
    verify();
  }}
>
  <input type="hidden" name="email" bind:value={email}>
  <input bind:value={otp} required placeholder="123456">

  <button>
    Verify 
  </button>
</form>

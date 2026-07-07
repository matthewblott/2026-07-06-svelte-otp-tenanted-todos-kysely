<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';

  let otp = $state('');
  let email = $state(page.url.searchParams.get('email') ?? '');

  async function verify() {
    await authClient.signIn.emailOtp({
      email,
      otp,
    });

    goto('/');
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

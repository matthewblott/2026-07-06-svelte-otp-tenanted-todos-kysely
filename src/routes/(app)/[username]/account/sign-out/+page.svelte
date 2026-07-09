<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';

  async function signOut() {
    await authClient.signOut();
    goto('/');
  }

</script>

<h1>Sign Out</h1>

<button on:click={signOut}>Sign out</button>

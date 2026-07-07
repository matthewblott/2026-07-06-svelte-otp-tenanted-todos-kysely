<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';

  async function signOut() {
    await authClient.signOut();
    goto('/');
  }

</script>

<button on:click={signOut}>Browser sign out</button>

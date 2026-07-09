<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';
  const session = authClient.useSession();

  async function deleteUser() {
    await authClient.deleteUser(); 
    goto('/');
  }

</script>
<h1>Delete Account</h1>

<button on:click={deleteUser}>Delete user</button>

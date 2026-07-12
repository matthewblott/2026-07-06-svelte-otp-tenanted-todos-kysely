<script lang="ts">
  import { getContext } from "svelte";
  import { authClient } from '$lib/auth-client';
  const routes = getContext('routes');
  const session = authClient.useSession();
  
  let isAnonymous = $state(true); 

  $effect(() => {
    const user = $session.data?.user;
    isAnonymous = Boolean(Number(user?.isAnonymous));
  });

</script>

<h1>Account</h1>

{#if !isAnonymous}
  <a href={routes.account.rename()}>Rename Account</a>
  <br>
  <a href={routes.account.signOut()}>Sign Out</a>
  <br>
{:else}
  <a href={routes.account.register()}>Add email address</a>
{/if}

<a href={routes.account.delete()}>Delete Account</a>

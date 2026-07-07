<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
  
  import { authClient } from '$lib/auth-client';
  import { routes } from '$lib/routes';

  const session = authClient.useSession();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if $session.data?.user} 
  <div>
    {$session.data?.user.name || 'no name'}
    {$session.data?.user.email}
    <a href={routes.auth.signOut.browser()}>Sign out</a>  
  </div>
{:else}
  <a href={routes.auth.signIn.browser()}>Sign in</a>
{/if}

{@render children()}

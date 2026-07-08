<script lang="ts">
  import type { PageData } from './$types';
	// let { children, data } = $props();
  let { data, children }: LayoutProps = $props();

  import { authClient } from '$lib/auth-client';
  import { routes } from '$lib/routes';

  const session = authClient.useSession();


  // let { data }: { data: PageData } = $props();

</script>

{#if $session.data?.user} 
  <div>
    {$session.data?.user.name || 'no name'}
    <br>
    {$session.data?.user.email}
    <br>
    <br>
    <a href={routes.auth.signOut.browser()}>Sign out</a>  
  </div>
{:else}
  <a href={routes.auth.signIn.browser()}>Sign in</a>
{/if}

{@render children()}


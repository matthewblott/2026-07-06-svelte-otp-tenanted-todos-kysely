<script lang="ts">
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { setContext } from 'svelte';
  import type { LayoutData } from './$types';
  import type { Snippet } from 'svelte';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

  const routes = createTenantRoutes(data.user.name);
  const signOutRoute = routes.auth.signOut.browser();

  setContext('routes', routes);

</script>

<div>
  {data.user?.name}
  <br>
  {data.user?.email}
  <br>
  <a href={signOutRoute}>Sign out</a>  
</div>

{@render children()}

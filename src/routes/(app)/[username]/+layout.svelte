<script lang="ts">
  import type { LayoutData } from './$types';
  import type { Snippet } from 'svelte';
  import { createTenantRoutes } from '$lib/routes/tenant';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

  const { user } = $derived(data);
  const username = $derived(user.name);
  const routes = $derived(createTenantRoutes(username));

</script>

<div>
  <a href={routes.todos.index()}>Todos</a> | 
  <a href={routes.account.index()}>{data.user?.name}</a>
</div>

{@render children()}

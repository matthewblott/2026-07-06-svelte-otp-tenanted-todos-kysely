<script lang="ts">
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

  const username = $derived(data.user?.name);
  const routes = $derived(createTenantRoutes(username!));

  let isAnonymous = $derived(data.user.isAnonymous); 

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

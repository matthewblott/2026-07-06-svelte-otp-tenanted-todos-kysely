<script lang="ts">
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
  let routes = $derived(createTenantRoutes(data.user.name!));
  let isAnonymous = $derived(data.user.isAnonymous); 

</script>

<h1>Account</h1>

{#if isAnonymous}
  <a href={routes.account.register()}>Add email address</a>
{:else}
  <a href={routes.account.rename()}>Rename Account</a>
  <br>
  <a href={routes.account.signOut()}>Sign Out</a>
  <br>
{/if}

<a href={routes.account.delete()}>Delete Account</a>

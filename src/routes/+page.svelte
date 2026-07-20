<script lang="ts">
  import { publicRoutes } from "$lib/routes";
  import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageHeader title="Todos App">
  <div role="group">
    <a href={publicRoutes.auth.signIn()} role="button">Sign-in</a>
    <button form="guest-sign-in">Continue as guest</button>
  </div>
</PageHeader>

<form method="post" id="guest-sign-in">
</form>

<script lang="ts">
  import { publicRoutes } from "$lib/routes";
  import { createTenantRoutes } from "$lib/routes/tenant";
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';

  async function signIn() {
    const { data, error } = await authClient.signIn.anonymous();

    if(!error) {
      const routes = createTenantRoutes(data.user.name);
      const route = routes.todos.index();
      goto(route);
    }
  }

</script>

<PageHeader title="Todos App">
  <div role="group">
    <a href={publicRoutes.auth.signIn()} role="button">Sign-in</a>
    <button onclick={signIn}>Continue as guest</button>
  </div>
</PageHeader>

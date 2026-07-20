<script lang="ts">
  import { createTenantRoutes } from '$lib/routes/tenant';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const username = $derived(data.user.name);
  const routes = $derived(createTenantRoutes(username));

</script>

<h1>Todos</h1>

<a href={routes.todos.new()}>New</a>

<ul>
  {#each data.todos as todo (todo.id)}
    <li>
      <a href={routes.todos.edit(todo.id)}>{todo.name}</a>
    </li>
  {/each}
</ul>

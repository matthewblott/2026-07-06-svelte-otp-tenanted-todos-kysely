<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();

  import { getContext } from 'svelte';
  const routes = getContext('routes');
  
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

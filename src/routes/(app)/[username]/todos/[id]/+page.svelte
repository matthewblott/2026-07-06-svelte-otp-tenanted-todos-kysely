<script lang="ts">
  import type { PageData, ActionData } from './$types';
  let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>Edit Todo</h1>

<form method="POST" action="?/update">
  <input name="name" value={form?.name ?? data.todo.name}>
  <input name="description" value={form?.description?? data.todo.description}>
  {#if form?.message}<p>{form.message}</p>{/if}
  <button>Save</button>
</form>

<form method="POST" action="?/delete">
  <button>Delete</button>
</form>

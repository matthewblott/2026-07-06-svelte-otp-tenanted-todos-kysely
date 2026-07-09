<script lang="ts">
  import type { ActionData } from './$types';
  let { form }: { form: ActionData } = $props();
</script>

<h1>New Todo</h1>

<form method="POST">
  <input name="name" value={form?.name ?? ''} />
  <input name="description" value={form?.description ?? ''} />
  {#if form?.message}<p>{form.message}</p>{/if}
  <button>Create</button>
</form>

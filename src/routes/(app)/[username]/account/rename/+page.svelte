<script lang="ts">
  import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<h1>Rename Account</h1>

<form method="post">
  <input name="name" value={data?.user?.name}> 
  <button>Save</button>
</form>


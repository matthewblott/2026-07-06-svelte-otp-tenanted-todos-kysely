<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import type { Snippet } from 'svelte';
  import '$lib/marx-css/marx.css';
  import '$lib/assets/site.css';

	let { children }: { children: Snippet } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
  {@render children()}
</main>

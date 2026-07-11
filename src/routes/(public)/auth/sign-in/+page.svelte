<script lang="ts">
  import type { PageProps } from './$types';

  let { form }: PageProps = $props();
  let email = $state(form?.email ?? '');
  let error = $state(form?.error ?? '');

  import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageHeader title="Sign in">
  <div role="group">
    <button form="send-otp">Send code</button>
  </div>
</PageHeader>

<form method="POST" id="send-otp">
  <input name="email" bind:value={email} placeholder="sally@example.com">
</form>

{#if error}
  <p role="alert">{error}</p>
{/if}

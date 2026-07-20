<script lang="ts">
  import { page } from '$app/state';

  let otp = $state('');
  let email = $state(page.url.searchParams.get('email') ?? '');

  import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageHeader title="Verify Email">
  <div role="group">
    <button form="verify-otp">
      Verify 
    </button>
  </div>
</PageHeader>

<form method="post" id="verify-otp">
  <input type="hidden" name="email" bind:value={email}>
  <input name="otp" bind:value={otp} required placeholder="123456">
</form>

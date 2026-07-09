<script lang="ts">
  import type { PageProps } from './$types';

  let { form }: PageProps = $props();
  let email = $state(form?.email ?? '');
  let error = $state(form?.error ?? '');

</script>

<h1>Sign in</h1>

<p>We'll send a one-time code to your email.</p>
<form method="POST">
  <label for="email">Email</label>
  <input id="email" type="email" name="email" bind:value={email} required />
  <button type="submit">Send code</button>
</form>

{#if error}
  <p role="alert">{error}</p>
{/if}

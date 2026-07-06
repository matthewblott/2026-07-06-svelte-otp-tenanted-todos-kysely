<script lang="ts">
  import type { PageProps } from './$types';

  let { form }: PageProps = $props();

  let email: string = $derived(form?.email ?? '');
  let otp: string = $derived(form?.otp ?? '');
  let error: string = $derived(form?.error ?? '');
  let step: 'email' | 'otp' = $derived(form?.step === 'otp' ? 'otp' : 'email');
</script>

{#if step === 'email'}
  <h1>Sign in</h1>
  <p>We'll send a one-time code to your email.</p>
  <form method="POST" action="?/sendOtp">
    <label for="email">Email</label>
    <input id="email" type="email" name="email" bind:value={email} required />
    <button type="submit">Send code</button>
  </form>
{:else}
  <h1>Check your email</h1>
  <p>Enter the code sent to {email}.</p>
  <form method="POST" action="?/verifyOtp">
    <input type="hidden" name="email" value={email} />
    <label for="otp">One-time code</label>
    <input id="otp" type="text" inputmode="numeric" name="otp" bind:value={otp} required />
    <button type="submit">Sign in</button>
  </form>
{/if}

{#if error}
  <p role="alert">{error}</p>
{/if}

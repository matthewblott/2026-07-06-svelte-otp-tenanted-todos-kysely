<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';

  let email = $state('');
  let otp = $state('');
  let step: 'email' | 'otp' = $state('email');
  let error = $state('');
  let loading = $state(false);

  async function sendOtp() {
    loading = true;
    error = '';
    const { error: err } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: 'sign-in',
    });
    loading = false;
    if (err) {
      error = err.message ?? 'Failed to send code.';
    } else {
      step = 'otp';
    }
  }

  async function verifyOtp() {
    loading = true;
    error = '';
    // const { error: err } = await authClient.emailOtp.signIn({
    //   email,
    //   otp,
    // });

    const { error: err } = await authClient.signIn.emailOtp({
      email,
      otp,
    });

    loading = false;
    if (err) {
      error = err.message ?? 'Invalid or expired code.';
    } else {
      goto('/');
    }
  }
</script>

{#if step === 'email'}
  <h1>Sign in</h1>
  <p>We'll send a one-time code to your email.</p>
  <label for="email">Email</label>
  <input id="email" type="email" bind:value={email} />
  <button onclick={sendOtp} disabled={loading}>
    {loading ? 'Sending…' : 'Send code'}
  </button>
{:else}
  <h1>Check your email</h1>
  <p>Enter the code sent to {email}.</p>
  <label for="otp">One-time code</label>
  <input id="otp" type="text" inputmode="numeric" bind:value={otp} />
  <button onclick={verifyOtp} disabled={loading}>
    {loading ? 'Verifying…' : 'Sign in'}
  </button>
  <button onclick={() => (step = 'email')}>Back</button>
{/if}

{#if error}
  <p role="alert">{error}</p>
{/if}


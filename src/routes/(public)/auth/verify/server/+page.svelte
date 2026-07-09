<script lang="ts">
  import type { PageProps } from './$types';

  let { form }: PageProps = $props();
  let email = $state(form?.email ?? '');
  let otp = $state(form?.otp ?? '');
  let error = $state(form?.error ?? '');

  // Extract email from URL query param if not in form
  $effect(() => {
    const url = new URL(window.location.href);
    const urlEmail = url.searchParams.get('email');
    if (urlEmail && !email) {
      email = decodeURIComponent(urlEmail);
    }
  });
</script>

<h1>Verify Email</h1>
<p>Enter the code sent to {email}.</p>
<form method="POST">
  <input type="hidden" name="email" value={email} />
  <input 
    name="otp" 
    bind:value={otp} 
    placeholder="123456"
    maxlength="6"
    required 
  >
  <button>Sign in</button>
</form>

{#if error}
  <p role="alert">{error}</p>
{/if}

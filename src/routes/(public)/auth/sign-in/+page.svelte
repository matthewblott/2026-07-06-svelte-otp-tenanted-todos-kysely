<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageHeader title="Sign in">
  <div role="group">
    <button form="send-otp">Send code</button>
  </div>
</PageHeader>

<form method="post" id="send-otp">
  <input type="email" name="email" placeholder="sally@example.com" required>
</form>

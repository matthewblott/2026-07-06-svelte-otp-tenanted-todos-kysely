<script lang="ts">
  import { authClient } from '$lib/auth-client';
  const session = authClient.useSession();
</script>

<form method="post">
  <input name="name" value={$session.data?.user.name}> 
  <button>Save</button>
</form>


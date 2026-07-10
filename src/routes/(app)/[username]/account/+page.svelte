<script lang="ts">
  import { getContext } from "svelte";
  const routes = getContext('routes');
</script>

<h1>Account</h1>

<a href={routes.account.rename()}>Rename Account</a>
<br>
<a href={routes.account.signOut()}>Sign Out</a>
<br>
<a href={routes.account.delete()}>Delete Account</a>

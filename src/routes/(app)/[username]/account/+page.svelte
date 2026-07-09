<script lang="ts">
  import { getContext } from "svelte";
  const routes = getContext('routes');
</script>

<h1>Account</h1>

<a href={routes.account.rename.browser()}>Rename User</a>
<br>
<a href={routes.account.signOut.browser()}>Sign Out</a>
<br>
<a href={routes.account.delete.browser()}>Delete Account</a>

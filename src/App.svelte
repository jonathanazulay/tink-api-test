<script lang="ts">
  import { Router, Route, links } from "svelte-routing";
  import Authenticate from "./Authenticate.svelte";
  import Result from "./Result.svelte";
  import Spinner from "./Spinner.svelte";
  import { transactionsByMerchants } from "./tink-store";
  import { fade } from "svelte/transition";
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
  }

  .spinner {
    position: absolute;
    top: 0;
    transform: translateX(50vw) translateX(-50%);
  }
</style>

<Router>
  <main use:links>
    <Route path="/">
      {#if $transactionsByMerchants === undefined}
        <div class="spinner" in:fade out:fade>
          <Spinner />
        </div>
      {:else if $transactionsByMerchants.success === false}
        <div in:fade={{ delay: 800 }}>
          <Authenticate />
        </div>
      {:else}
        <div in:fade={{ delay: 800 }}>
          <Result data={$transactionsByMerchants.data} />
        </div>
      {/if}
    </Route>
    <Route path="/link">
      <Authenticate />
    </Route>
  </main>
</Router>

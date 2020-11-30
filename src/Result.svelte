<script lang="ts">
  import { scale } from "svelte/transition";
  import { bounceOut } from "svelte/easing";
  export let data: any;
  let sorted = Object.entries(data ?? {}).sort((d1, d2) =>
    d1[1] > d2[1] ? 1 : -1
  );
  let favoriteMerchant = sorted[0]?.[0] ?? "Unknown!";
  let logo = fetch(`/api/logo?search=${favoriteMerchant}%20logo%20square`)
    .then((r) => r.json())
    .then((r) => r.image);
</script>

<style>
  .wrapper {
    color: var(--light);
    background: var(--dark);
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 2rem;
    text-align: center;
    align-items: center;
  }

  header {
    margin-top: 2rem;
  }

  .logo {
    margin-top: auto;
    margin-bottom: auto;
  }

  .logo > img {
    max-width: 40vw;
    max-height: 30vh;
  }

  h1 {
    margin: 0;
  }
</style>

<div class="wrapper">
  <header>
    Your favorite merchant is...
    <h1>{favoriteMerchant}</h1>
  </header>
  {#await logo}
    <div />
  {:then logo}
    <div
      in:scale={{ delay: 1000, easing: bounceOut, duration: 1000 }}
      class="logo">
      <img src={logo} alt={`${favoriteMerchant} logo`} />
    </div>
  {/await}
  <a class="btn btn-dark" href="/link">Try again with another account</a>
</div>

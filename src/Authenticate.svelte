<script lang="ts">
  import { TINK_CLIENT_ID } from './secret';
  let tinkLinkUrl: string = `https://link.tink.com/1.0/authorize/?client_id=${TINK_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=investments:read,transactions:read,credentials:read,statistics:read,user:read,accounts:read&market=SE&locale=en_US&test=true`;
</script>

<style>
  div {
    text-align: center;
  }
</style>

<div>
  <h2>Find your favorite merchant</h2>
  <button
    class="btn mt-4 btn-lg btn-primary"
    on:click={() => (window.location.href = tinkLinkUrl)}>Get started!</button>
</div>

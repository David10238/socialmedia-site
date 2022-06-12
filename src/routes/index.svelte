<script lang="ts">
  import { onMount } from "svelte";

  import { KeyStorage } from "./../api/KeyStorage";

  onMount(() => {
    const keys = KeyStorage.get();
  });
</script>

<button on:click={KeyStorage.logout}>Logout</button>

<style lang="scss">
  @import "src/styles/vars.scss";
</style>

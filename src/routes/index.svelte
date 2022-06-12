<script lang="ts">
  import { onMount } from "svelte";

  import { KeyStorage } from "./../api/KeyStorage";

  onMount(() => {
    const keys = KeyStorage.Get();
  });
</script>

<button on:click={KeyStorage.Logout}>Logout</button>

<style lang="scss">
  @import "src/styles/vars.scss";
</style>

<script lang="ts">
  import { onMount } from "svelte";

  import { KeyStorage } from "../api/KeyStorage";
  import Wall from "../components/wall.svelte";

  let mounted = false;

  onMount(() => (mounted = true));
</script>

{#if mounted}
  <Wall target_id={KeyStorage.get().user_id} search_friends={true} />
{/if}

<style lang="scss">
  @import "src/styles/vars.scss";
</style>

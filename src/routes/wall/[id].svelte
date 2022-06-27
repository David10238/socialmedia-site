<script type="ts">
  import { page } from "$app/stores";

  import Wall from "../../components/wall.svelte";
</script>

<Wall target_id={JSON.parse($page.params.id)} search_friends={false} />

<style lang="scss">
  @import "src/styles/vars.scss";
</style>

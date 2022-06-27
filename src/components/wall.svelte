<script lang="ts">
  import { API } from "../api/API";

  import type { MessageResponse } from "../api/Models";

  import { onMount } from "svelte";

  import { KeyStorage } from "../api/KeyStorage";

  export let target_id: number;
  export let search_friends: boolean;

  let messageReponse: MessageResponse = { messages: [], lowest_id: 0 };

  onMount(async () => {
    messageReponse = await API.requestMessages({
      target_id: target_id,
      lowest_loaded_message: messageReponse.lowest_id,
      search_friends: search_friends,
    });
  });
</script>

<div class="message-wall">
  <button on:click={KeyStorage.logout}>Logout</button>
  {#each messageReponse.messages as message}
    <div class="message-container">
      {message.message}
    </div>
  {/each}
</div>

<style lang="scss">
  @import "src/styles/vars.scss";
  .message-wall {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .message-container {
    background-color: $box-color;
    color: $text-color;
    padding: 3px;
    width: 500px;
    margin-top: 5px;
  }
</style>

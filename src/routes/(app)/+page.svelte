<!-- Your Svelte template
<p class="text-center font-extrabold text-1xl">E-shop je ve fázi vývoje</p>

<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  const usernames = writable<string[]>([]);

  const loadData = async () => {
    try {
      const response = await fetch("/api");
      const data = await response.json();
      const usernamesArray = data.map((user: { username: string }) => user.username);
      usernames.set(usernamesArray);
      
    } catch (error) {
      console.error(error);
    }
  };

  onMount(loadData);
</script>
<ul>
  {#each $usernames as username}
    <li>{username}</li>
  {/each}
</ul> -->

<!-- src/routes/sendEmail.svelte -->


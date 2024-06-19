<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { role } from "$/lib/stores";

  const handleCheck = () => {
    if ($role !== "Admin") {
      goto("/");
    }
  };

  onMount(handleCheck);
</script>

<a href="/admin/users">test</a>

<slot />
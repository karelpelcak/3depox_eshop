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

<nav
  class="w-screen h-[40px] bg-black flex gap-20 content-center items-center px-10"
>
  <a href="/" class="text-white hover:text-gray-300 font-bold">Domů</a>
  <div class="flex gap-10">
    <a href="/admin/users" class="text-white">Uživatelé</a>
    <a href="/admin/category" class="text-white">Kategorie</a>
    <a href="/admin/products" class="text-white">Produkty</a>
  </div>
</nav>

<slot />

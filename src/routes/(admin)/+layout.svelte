<script>
  import { removeCookie } from "$/lib/cookie";
  import { goto } from "$app/navigation";

  const ItemStyle =
    "bg-blue-900 w-[80%] h-[40px] border-2 border-blue-700 text-white text-center flex justify-center content-center items-center text-md transition-all duration-150 hover:text-lg hover:font-bold hover:rounded-md";

  async function logout() {
    removeCookie("AuthToken");
    goto("/");
  }
</script>

<div class="flex flex-row h-screen">
  <nav class="w-[15%] h-full bg-blue-800 rounded-r-lg fixed">
    <div class="text-3xl text-white font-extrabold text-center py-5">
      <a href="/">
        <span class="text-blue-500">3D</span>Epox
      </a>
    </div>
    <div class="w-[90%] mx-auto">
      <hr />
    </div>
    <div class="flex flex-col gap-5 items-center content-center mt-5">
      <a class={ItemStyle} href="/admin/users">Uživatelé</a>
      <a class={ItemStyle} href="/admin/category">Kategorie</a>
      <a class={ItemStyle} href="/admin/products">Produkty</a>
    </div>
    <div class="absolute bottom-6 left-6 text-white border-2 p-1 rounded-md">
      <button class="text-center" on:click={logout}>Odhlásit se</button>
    </div>
  </nav>

  <div class="w-[80%] h-screen ml-[20%] overflow-y-auto">
    <slot />
  </div>
</div>
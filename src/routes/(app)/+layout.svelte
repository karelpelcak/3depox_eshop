<script lang="ts">
  import MdLocalPhone from "svelte-icons/md/MdLocalPhone.svelte";
  import MdEmail from "svelte-icons/md/MdEmail.svelte";
  import MdLocalShipping from "svelte-icons/md/MdLocalShipping.svelte";
  import MdAssignment from "svelte-icons/md/MdAssignment.svelte";
  import MdPermIdentity from "svelte-icons/md/MdPermIdentity.svelte";
  import MdSearch from "svelte-icons/md/MdSearch.svelte";
  import MdShoppingCart from "svelte-icons/md/MdShoppingCart.svelte";
  import { getCookie, removeCookie } from "$/lib/cookie";
  import { totalQuantity, role, username } from "$/lib/stores";

  const AuthToken = getCookie("AuthToken");
  const LoadUser = async () => {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      await username.set(data.Username);
      await role.set(data.role);
    } else {
      logout();
    }
  };

  if (AuthToken) {
    LoadUser();
  }

  async function logout() {
    removeCookie("AuthToken");
    location.reload();
  }
</script>

<nav class="overflow-hidden">
  <div
    class="w-screen md:h-[50px] h-[50px] flex-row md:flex-row bg-gray-100 flex justify-between items-center content-normal px-4"
  >
    <div class="flex gap-4">
      <a href="tel:+420123456789" class="flex gap-1">
        <div class="h-[24px] w-[24px]">
          <MdLocalPhone />
        </div>
        <span class="hidden lg:flex">+420 123 456 789</span>
      </a>
      <a href="mailto:info@3depox.cz" class="flex gap-1">
        <div class="h-[24px] w-[24px]">
          <MdEmail />
        </div>
        <span class="hidden lg:flex">info@3depox.cz</span>
      </a>
      <a href="/doprava_platba" class="flex gap-1">
        <div class="h-[24px] w-[24px]">
          <MdLocalShipping />
        </div>
        <span class="hidden lg:flex">Doprava a platba</span>
      </a>
      <a href="/obchodni_podminky" class="flex gap-1">
        <div class="h-[24px] w-[24px]">
          <MdAssignment />
        </div>
        <span class="hidden lg:flex">Obchodní podmínky</span>
      </a>
    </div>
    <div class="flex gap-6">
      {#if !AuthToken}
        <a href="/login" class="flex">
          <div class="h-[24px] w-[24px]">
            <MdPermIdentity />
          </div>
          <span>Přihlásit se</span>
        </a>
      {:else}
        <button on:click={logout}>Odhlásit se</button>
        <span>{$username}</span>
      {/if}
    </div>
  </div>
  <div
    class="w-screen h-[100px] bg-white flex justify-between items-center content-center px-6"
  >
    <div class="text-3xl font-black">
      <a href="/">
        <span class="text-blue-500">3D</span>Epox
      </a>
    </div>
    <div class="hidden lg:flex">
      <div>
        <input
          type="text"
          class="w-[350px] h-[50px] border-2 border-black rounded-l-lg focus:outline-none p-2"
        />
      </div>
      <div
        class="flex justify-center content-center items-center text-center border-2 border-l-0 border-black px-2 rounded-r-lg"
      >
        <button>
          <div class="h-[27px] w-[27px]">
            <MdSearch />
          </div>
        </button>
      </div>
    </div>
    <a href="/cart">
      <div
        class="w-[100px] h-[50px] bg-blue-500 flex justify-between p-2 rounded-xl content-center items-center"
      >
        <div class="h-[24px] w-[24px]">
          <MdShoppingCart />
        </div>
        <span class="font-bold text-xl">{$totalQuantity}</span>
      </div>
    </a>
  </div>

  <div class="w-full h-auto py-4 md:py-6 bg-black flex flex-col md:flex-row justify-center items-center text-white shadow-md transition-all duration-300">
    <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <a href="/epoxid" class="text-lg font-semibold hover:text-gray-300 transition duration-200">Epoxid</a>
        <a href="/3dtisk" class="text-lg font-semibold hover:text-gray-300 transition duration-200">3DTisk</a>
        <a href="/doprava_platba" class="text-lg font-semibold hover:text-gray-300 transition duration-200">Doprava a platba</a>
        <a href="/obchodni_podminky" class="text-lg font-semibold hover:text-gray-300 transition duration-200">Obchodní podmínky</a>
        <a href="/kontakt" class="text-lg font-semibold hover:text-gray-300 transition duration-200">Kontakt</a>
        {#if $role === "Admin"}
            <a href="/admin" class="text-lg font-semibold hover:text-gray-300 transition duration-200">Admin Panel</a>
        {/if}
    </div>
</div>

</nav>

<slot />

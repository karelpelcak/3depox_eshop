<script lang="ts">
  const Expand = true;
  import MdLocalPhone from "svelte-icons/md/MdLocalPhone.svelte";
  import MdEmail from "svelte-icons/md/MdEmail.svelte";
  import MdLocalShipping from "svelte-icons/md/MdLocalShipping.svelte";
  import MdAssignment from "svelte-icons/md/MdAssignment.svelte";
  import MdPermIdentity from "svelte-icons/md/MdPermIdentity.svelte";
  import MdSearch from "svelte-icons/md/MdSearch.svelte";
  import MdShoppingCart from "svelte-icons/md/MdShoppingCart.svelte";
</script>

<nav>
  <div
    class="w-screen md:h-[50px] h-[75px] flex-col md:flex-row bg-gray-100 flex justify-between items-center content-normal px-2"
  >
    <div class="flex gap-4">
      <a href="/" class="flex gap-1">
        <div class="h-[24px] w-[24px]">
          <MdLocalPhone />
        </div>
        <span class="hidden lg:flex">+420 123 456 789</span>
      </a>
      <a href="/" class="flex gap-1">
        <div class="h-[24px] w-[24px]">
          <MdEmail />
        </div>
        <span class="hidden lg:flex">info@3depox.cz</span>
      </a>
      <a href="/" class="flex gap-1">
        <div class="h-[24px] w-[24px]">
          <MdLocalShipping />
        </div>
        <span class="hidden lg:flex">Doprava a platba</span>
      </a>
      <a href="/" class="flex gap-1">
        <div class="h-[24px] w-[24px]">
          <MdAssignment />
        </div>
        <span class="hidden lg:flex">Obchodní podmínky</span>
      </a>
    </div>
    <div>
      <a href="/login" class="flex">
        <div class="h-[24px] w-[24px]">
          <MdPermIdentity />
        </div>
        <span>Přihlásit se</span>
      </a>
    </div>
  </div>
  <div
    class="w-screen h-[150px] bg-white flex justify-between items-center content-center px-6"
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
        <span class="font-bold text-xl">200</span>
      </div>
    </a>
  </div>
  {#if Expand}
  <h1>teste</h1>
{:else}
  <div class="w-screen h-auto py-4 md:py-0 md:h-[50px] bg-black flex justify-center flex-col md:flex-row gap-2 md:gap-6 content-center items-center text-white">
    <a href="/">Epoxid</a>
    <a href="/">3DTisk</a>
    <a href="/">Doprava a platba</a>
    <a href="/">Obchodni podminky</a>
    <a href="/">Kontakt</a>
  </div>
{/if}
</nav>

<slot />

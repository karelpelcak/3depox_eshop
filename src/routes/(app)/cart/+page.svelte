<script lang="ts">
  import CartItemLayout from "$/lib/components/CartItemLayout.svelte";
  import { cart } from "$/lib/stores";
  import type { CartItem } from "$/lib/types";

  let items: CartItem[] = [];
  cart.subscribe((value) => {
    items = value;
  });
</script>

<div class="flex flex-col items-center content-center mt-10">
  <h1 class="text-3xl font-bold">Nákupní košík</h1>
  {#if items.length === 0}
    <h1 class="text-3xl font-bold">Nákupní košík je prázdný</h1>
  {:else}
    <ul>
      {#each items as item}
        <CartItemLayout ProductId={item.id} ProductQuantity={item.quantity} />
      {/each}
    </ul>
  {/if}
</div>

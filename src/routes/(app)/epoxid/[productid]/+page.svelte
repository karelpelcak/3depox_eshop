<script lang="ts">
  import { CenaBezDPH, truncateDescription } from "$/lib/functions";
  import { addToCart } from "$/lib/stores.js";

  export let data;
</script>

<div
  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"
>
  {#each data.productList as product}
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={product.ProductImage1Url}
        alt={product.ProductName}
        class="w-full h-48 object-contain"
      />
      <div class="p-4">
        <a href={"/product/" + product.ProductId}
          ><h1 class="text-lg font-semibold">{product.ProductName}</h1></a
        >
        <p class="text-gray-600 mt-2">
          {truncateDescription(product.ProductDesc, 36)}
        </p>
        <div class="flex justify-between items-center mt-4">
          <div>
            <p class="text-gray-800 text -lg mt-2">{product.ProductPrice} Kč</p>
            <p class="text-gray-400 text-xs mt-2">
              {CenaBezDPH(product.ProductPrice)} Kč bez DPH
            </p>
          </div>
          {#if product.ProductId}
            <button on:click={() => addToCart(product.ProductId)}>Pridat</button
            >
          {/if}
          <p class="text-gray-800 mt-2">{product.ProductQuantity} ks</p>
          <amp-ad
            width="100vw"
            height="320"
            type="adsense"
            data-ad-client="ca-pub-5702656857463597"
            data-ad-slot="7034287682"
            data-auto-format="rspv"
            data-full-width=""
          >
          </amp-ad>
        </div>
      </div>
    </div>
  {/each}
</div>

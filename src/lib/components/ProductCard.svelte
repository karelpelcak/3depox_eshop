<script lang="ts">
  import { CenaBezDPH, truncateDescription } from "../functions";
  import { addToCart } from "../stores";

export let ProductImage1Url;
export let ProductName;
export let ProductId;
export let ProductDesc;
export let ProductPrice;
export let ProductQuantity;

</script>

<div class="bg-white shadow-md rounded-lg overflow-hidden">
    <img
      src={ProductImage1Url}
      alt={ProductName}
      class="w-full h-48 object-contain"
    />
    <div class="p-4">
      <a href={"/product/" + ProductId}
        ><h1 class="text-lg font-semibold">{ProductName}</h1></a
      >
      <p class="text-gray-600 mt-2">
        {truncateDescription(ProductDesc, 36)}
      </p>
      <div class="flex justify-between items-center mt-4">
        <div>
          <p class="text-gray-800 text -lg mt-2">{ProductPrice} Kč</p>
          <p class="text-gray-400 text-xs mt-2">
            {CenaBezDPH(ProductPrice)} Kč bez DPH
          </p>
        </div>
        {#if ProductId}
          <button on:click={() => addToCart(ProductId)}>Pridat</button
          >
        {/if}
        <p class="text-gray-800 mt-2">{ProductQuantity} ks</p>
      </div>
    </div>
  </div>
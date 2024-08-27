<script lang="ts">
  import { onMount } from "svelte";
  import { CenaBezDPH } from "../functions";
  import { addToCart, removeFromCart } from "../stores";

  export let ProductId: number;
  export let ProductQuantity: number;

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  interface IProductProps {
    ProductId: number;
    ProductName: string;
    ProductDesc: string;
    ProductImage1Url: string;
    ProductPrice: number;
    ProductQuantity: number;
  }

  let productData: IProductProps | null = null;
  let fetchError: string | null = null;

  const FetchProductById = async (productId: number) => {
    try {
      const response = await fetch(
        `/api/products/productbyid?ProductId=${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        productData = data.Products[0];
      } else {
        throw new Error(data.message || "Failed to fetch product");
      }
    } catch (err: any) {
      fetchError = err.message;
      console.error(fetchError);
    }
  };

  onMount(() => FetchProductById(ProductId));
</script>

{#if fetchError}
  <div class="error">{fetchError}</div>
{:else if productData !== null}
  <div
    class="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-10 my-2 rounded-md border-2 border-black p-4 md:p-2 w-[100%] items-center"
  >
    <img
      src={productData.ProductImage1Url}
      alt={productData.ProductName}
      class="w-16 h-16 md:w-8 md:h-8"
    />
    <h1 class="text-lg md:text-base">{productData.ProductName}</h1>
    <h1 class="text-lg md:text-base">Cena: {productData.ProductPrice} Kč</h1>
    <h1 class="text-lg md:text-base">Cena bez DPH: {CenaBezDPH(productData.ProductPrice)} Kč</h1>
    <div class="flex gap-4 md:gap-2 justify-center items-center">
      <button class="font-extrabold text-2xl md:text-4xl" on:click={() => handleRemoveFromCart(ProductId)}> - </button>
      <h1 class="text-lg md:text-base">{ProductQuantity}</h1>
      <button class="font-extrabold text-2xl" on:click={() => addToCart(ProductId)}> + </button>
    </div>
    <h1 class="text-lg md:text-base">{productData.ProductPrice * ProductQuantity} Kč</h1>
  </div>
{:else}
  <div>Loading...</div>
{/if}

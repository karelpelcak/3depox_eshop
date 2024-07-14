<script lang="ts">
  import { getCookie } from "$/lib/cookie";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  const AuthToken = getCookie("AuthToken");
  const ProductsList = writable<IProductProps[]>([]);

  interface IProductProps {
    ProductId: number;
    ProductName: string;
    ProductDesc: string;
    ProductImage1Url: string;
    ProductImage2Url: string;
    ProductImage3Url: string;
    ProductImage4Url: string;
    ProductPrice: number;
    ProductQuantity: number;
    CategoryId: number;
  }

  const GetProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        ProductsList.set(data.Products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const truncateDescription = (desc: string, maxLength: number) => {
    return desc.length > maxLength
      ? desc.substring(0, maxLength) + "..."
      : desc;
  };

  const CenaBezDPH = (price: number) => {
    const sazba = 1.21;
    const result = price / sazba;
    const fixed = result.toFixed(2);
    return fixed;
  };

  onMount(GetProducts);
</script>

<div
  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"
>
  {#each $ProductsList as product}
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={product.ProductImage1Url}
        alt={product.ProductName}
        class="w-full h-48 object-contain"
      />
      <div class="p-4">
        <h1 class="text-lg font-semibold">{product.ProductName}</h1>
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
          <p class="text-gray-800 mt-2">{product.ProductQuantity} ks</p>
        </div>
      </div>
    </div>
  {/each}
</div>

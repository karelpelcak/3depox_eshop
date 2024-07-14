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
  
    onMount(GetProducts);
  </script>
  
  <style>
    .product-card {
      @apply bg-white shadow-md rounded-lg overflow-hidden;
    }
    .product-image {
      @apply w-full h-48 object-contain;
    }
    .product-details {
      @apply p-4;
    }
    .product-title {
      @apply text-lg font-semibold;
    }
    .product-desc {
      @apply text-gray-600 mt-2;
    }
    .product-price,
    .product-quantity {
      @apply text-gray-800 mt-2;
    }
  </style>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    {#each $ProductsList as product}
      <div class="product-card">
        <img src={product.ProductImage3Url} alt={product.ProductName} class="product-image" />
        <div class="product-details">
          <h1 class="product-title">{product.ProductName}</h1>
          <p class="product-desc">{product.ProductDesc}</p>
          <div class="flex justify-between items-center mt-4">
            <p class="product-price">{product.ProductPrice} Kč</p>
            <p class="product-quantity">{product.ProductQuantity} ks</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
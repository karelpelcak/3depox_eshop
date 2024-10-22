<script lang="ts">
  import { getCookie } from "$/lib/cookie.js";
  import { goto } from "$app/navigation";

  export let data;

  let productPrice = data.product?.ProductPrice ?? 0;
  let productQuantity = data.product?.ProductQuantity ?? 0;

  function updateProduct() {
    data.product = {
      ...data.product,
      ProductPrice: productPrice,
      ProductQuantity: productQuantity,
    };
  }

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    const AuthToken = getCookie("AuthToken");

    try {
      const response = await fetch("/api/admin/products/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthToken}`,
        },
        body: JSON.stringify({
          productId: data.productId,
          productName: data.productName,
          productPrice: productPrice,
          productQuantity: productQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      console.log("Product updated successfully");
      goto("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
</script>

<form
  on:submit={handleSubmit}
  class="max-w-lg mx-auto p-6 bg-white rounded shadow-md"
>
  <h1 class="text-2xl font-bold mb-4">{data.productName}</h1>

  <div class="mb-4">
    <label
      class="block text-sm font-medium text-gray-700 mb-1"
      for="productPrice">Price</label
    >
    <input
      type="number"
      id="productPrice"
      bind:value={productPrice}
      on:input={updateProduct}
      class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div class="mb-6">
    <label
      class="block text-sm font-medium text-gray-700 mb-1"
      for="productQuantity">Quantity</label
    >
    <input
      type="number"
      id="productQuantity"
      bind:value={productQuantity}
      on:input={updateProduct}
      class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button type="submit" class="w-full bg-black text-white py-2 rounded">
    Uložit
  </button>
</form>

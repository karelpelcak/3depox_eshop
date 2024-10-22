<script lang="ts">
  export let data;
</script>

<!-- Tlačítko Přidat Produkt -->
<div class="flex justify-center ">
  <div class="m-2 w-[200px]">
    <a href="/admin/products/new">
      <button
        class="bg-blue-900 w-[80%] h-[40px] border-2 border-blue-700 text-white text-center flex justify-center items-center text-md transition-all duration-150 hover:font-bold hover:rounded-md"
      >
        Přidat nový produkt
      </button>
    </a>
  </div>
</div>

<!-- Product Table -->
<div class="overflow-x-auto">
  <table
    class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg"
  >
    <thead>
      <tr class="bg-blue-800 text-white">
        <th class="text-left py-2 px-4 border-b">Obrázek</th>
        <th class="text-left py-2 px-4 border-b">Název produktu</th>
        <th class="text-left py-2 px-4 border-b">Cena</th>
        <th class="text-left py-2 px-4 border-b">Množství</th>
        <th class="text-left py-2 px-4 border-b">Akce</th>
      </tr>
    </thead>
    <tbody>
      {#each data.ProductList as item}
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="py-2 px-4 border-b">
            <img
              src={item.ProductImage1Url}
              alt={item.ProductName}
              class="w-16 h-16 object-cover rounded"
            />
          </td>
          <td class="py-2 px-4 border-b">{item.ProductName}</td>
          <td class="py-2 px-4 border-b">{item.ProductPrice} Kč</td>
          <td class="py-2 px-4 border-b">{item.ProductQuantity} Ks</td>
          <td class="py-2 px-4 border-b">
            <a
              class="bg-blue-900 text-white border-2 border-blue-700 rounded-md px-2 py-1 hover:bg-blue-800 transition-all duration-150"
              href={`/admin/products/edit/${item.ProductId}`}>Upravit</a
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

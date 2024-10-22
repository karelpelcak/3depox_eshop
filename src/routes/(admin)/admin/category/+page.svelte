<script lang="ts">
  import { getCookie } from "$/lib/cookie";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  interface ICategoryProps {
    CategoryId: number;
    CategoryName: string;
    CategoryFor: string;
  }

  const AuthToken = getCookie("AuthToken");
  const Categories = writable<ICategoryProps[]>([]);
  let SelectedCategoryName: string = "";
  let selectedCategoryFor: string = "";
  const productTypes = [
    {
      displayName: "3DTisk",
      Value: "3dprint",
    },
    {
      displayName: "Epoxid",
      Value: "epoxid",
    },
  ];

  const LoadCategory = async () => {
    try {
      const response = await fetch("/api/admin/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        Categories.set(data.Categories);
      } else {
        const errorData = await response.json();
        console.error("Error fetching categories:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const deleteCategory = async (categoryId: number, categoryName: string) => {
    try {
      const response = await fetch(`/api/admin/category`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthToken,
        },
        body: JSON.stringify({
          CategoryId: categoryId,
          CategoryName: categoryName,
        }),
      });

      if (response.ok) {
        Categories.update((categories) =>
          categories.filter((category) => category.CategoryId !== categoryId)
        );
      } else {
        const errorData = await response.json();
        console.error("Error deleting category:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const AddCategoryFetch = async () => {
    const response = await fetch(`/api/admin/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthToken,
      },
      body: JSON.stringify({
        CategoryName: SelectedCategoryName,
        CategoryFor: selectedCategoryFor,
      }),
    });
    if (response.ok) {
      // Optionally handle success
    } else {
      const ErrorData = await response.json();
      console.error(ErrorData);
    }
  };

  const AddCategory = async () => {
    if (SelectedCategoryName === "" || SelectedCategoryName === undefined) {
      return;
    }
    await AddCategoryFetch();
    LoadCategory();
    SelectedCategoryName = "";
  };
  
  onMount(LoadCategory);
</script>

<div class="container mx-auto px-4 py-8">
  <h2 class="text-2xl font-bold text-center mb-6 text-blue-900">Správa Kategorií</h2>
  <div class="my-4 flex gap-4">
    <input
      type="text"
      class="focus:outline-none border-2 border-blue-700 rounded-md px-3 py-2"
      placeholder="Název kategorie"
      bind:value={SelectedCategoryName}
    />
    <select
      name="productType"
      id="productType"
      class="border-2 border-blue-700 rounded-md px-3 py-2"
      bind:value={selectedCategoryFor}
    >
      <option value="" disabled selected>Vyberte typ produktu</option>
      {#each productTypes as typeVal}
        <option value={typeVal.Value}>{typeVal.displayName}</option>
      {/each}
    </select>
    <button
      on:click={AddCategory}
      class="bg-blue-900 text-white border-2 border-blue-700 rounded-md px-4 py-2 hover:bg-blue-800 transition-all duration-150"
    >
      Přidat
    </button>
  </div>
  <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
    <thead class="bg-blue-800 text-white">
      <tr>
        <th class="py-2 px-4 border-b">Id</th>
        <th class="py-2 px-4 border-b">Kategorie</th>
        <th class="py-2 px-4 border-b">Kategorie pro</th>
        <th class="py-2 px-4 border-b"></th>
      </tr>
    </thead>
    <tbody>
      {#each $Categories as Category}
        <tr class="hover:bg-gray-100 text-center transition-colors">
          <td class="py-2 px-4 border-b">{Category.CategoryId}</td>
          <td class="py-2 px-4 border-b">{Category.CategoryName}</td>
          <td class="py-2 px-4 border-b">{Category.CategoryFor}</td>
          <td class="py-2 px-4 border-b">
            <button
              class="text-red-500 hover:text-red-700 transition-colors"
              on:click={() => deleteCategory(Category.CategoryId, Category.CategoryName)}
            >
              Smazat
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<script lang="ts">
  import { getCookie } from "$/lib/cookie";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  interface Category {
    CategoryId: number;
    CategoryName: string;
  }

  const AuthToken = getCookie("AuthToken");
  const Categories = writable<Category[]>([]);

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
            CategoryName: categoryName
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

  onMount(LoadCategory);
</script>

<div class="container mx-auto px-4 py-8">
  <table class="min-w-full bg-white border border-gray-200">
    <thead>
      <tr>
        <th class="py-2 px-4 border-b">Id</th>
        <th class="py-2 px-4 border-b">Category</th>
        <th class="py-2 px-4 border-b"></th>
      </tr>
    </thead>
    <tbody>
      {#each $Categories as Category}
        <tr class="hover:bg-gray-100 text-center">
          <td class="py-2 px-4 border-b">{Category.CategoryId}</td>
          <td class="py-2 px-4 border-b">{Category.CategoryName}</td>
          <td class="py-2 px-4 border-b">
            <button class="text-red-500" on:click={() => deleteCategory(Category.CategoryId, Category.CategoryName)}
              >Smazat</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

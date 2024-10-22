<script lang="ts">
  import { getCookie } from "$/lib/cookie";
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { writable } from "svelte/store";

  let TypeVal = true;
  let productName = "";
  let productDesc = "";
  let productImage1 = "";
  let productImage2 = "";
  let productImage3 = "";
  let productImage4 = "";
  let productPrice = 0;
  let productQuantity = 0;
  let categoryId = 0;
  let file: File | null = null;

  const AuthToken = getCookie("AuthToken");

  interface ICategoryProps {
    CategoryId: number;
    CategoryName: string;
    CategoryFor: string;
  }

  const Categories3DPrint = writable<ICategoryProps[]>([]);
  const CategoriesEpoxid = writable<ICategoryProps[]>([]);
  const DisplayedCategories = writable<ICategoryProps[]>([]);

  let content: string = "";
  let editorRef: HTMLDivElement | null = null;

  const handleCommand = (command: string | undefined) => {
    if (command) {
      document.execCommand(command, false, "");
    }
  };

  const handleInput = () => {
    if (editorRef) {
      content = editorRef.innerHTML;
    }
  };

  const handleSubmit = async () => {
    const object = {
      ProductName: productName,
      ProductDesc: editorRef!.innerHTML.toString(),
      ProductImage1Url: productImage1,
      ProductImage2Url: productImage2,
      ProductImage3Url: productImage3,
      ProductImage4Url: productImage4,
      ProductPrice: productPrice,
      ProductQuantity: productQuantity,
      CategoryId: categoryId,
    };
    console.log("🚀 ~ handleSubmit ~ object:", object);

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthToken,
        },
        body: JSON.stringify(object),
      });
      console.log("🚀 ~ handleSubmit ~ response:", response);
      if (response.ok) {
        toast.success("Produkt přidán");
        setTimeout(() => {
          productName = "";
          productDesc = "";
          productImage1 = "";
          productImage2 = "";
          productImage3 = "";
          productImage4 = "";
          productPrice = 0;
          productQuantity = 0;
          categoryId = 0;
          DisplayedCategories.subscribe((categories) => {
            if (categories.length > 0) {
              categoryId = categories[0].CategoryId;
            }
          });
        }, 500);
      } else {
        toast.error("Error");
        setTimeout(() => {
          productName = "";
          productDesc = "";
          productImage1 = "";
          productImage2 = "";
          productImage3 = "";
          productImage4 = "";
          productPrice = 0;
          productQuantity = 0;
          categoryId = 0;
          DisplayedCategories.subscribe((categories) => {
            if (categories.length > 0) {
              categoryId = categories[0].CategoryId;
            }
          });
        }, 500);
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Error");
      setTimeout(() => {
        productName = "";
        productDesc = "";
        productImage1 = "";
        productImage2 = "";
        productImage3 = "";
        productImage4 = "";
        productPrice = 0;
        productQuantity = 0;
        categoryId = 0;
        DisplayedCategories.subscribe((categories) => {
          if (categories.length > 0) {
            categoryId = categories[0].CategoryId;
          }
        });
      }, 500);
    }
  };

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
        const categories = data.Categories;

        Categories3DPrint.set(
          categories.filter(
            (category: ICategoryProps) => category.CategoryFor === "3dprint"
          )
        );
        CategoriesEpoxid.set(
          categories.filter(
            (category: ICategoryProps) => category.CategoryFor === "epoxid"
          )
        );

        DisplayedCategories.set(
          categories.filter(
            (category: ICategoryProps) => category.CategoryFor === "3dprint"
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Error fetching categories:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    let selectedValue = target.value;
    if (selectedValue === "3dtisk") {
      TypeVal = true;
      Categories3DPrint.subscribe((categories) => {
        DisplayedCategories.set(categories);
      });
    } else if (selectedValue === "epoxid") {
      TypeVal = false;
      CategoriesEpoxid.subscribe((categories) => {
        DisplayedCategories.set(categories);
      });
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (event: Event, imageNumber: number) => {
    const target = event.target as HTMLInputElement;
    file = target.files ? target.files[0] : null;
    if (file) {
      const base64 = await convertToBase64(file);
      switch (imageNumber) {
        case 1:
          productImage1 = base64;
          break;
        case 2:
          productImage2 = base64;
          break;
        case 3:
          productImage3 = base64;
          break;
        case 4:
          productImage4 = base64;
          break;
      }
    }
  };

  onMount(LoadCategory);
</script>

<Toaster />

<form action="" on:submit|preventDefault={handleSubmit} class="overflow-hidden">
  <div class="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
    <h2 class="text-3xl font-bold mb-8 text-center text-gray-900">
      Přidat nový produkt
    </h2>

    <!-- Product Name -->
    <div class="mb-5">
      <input
        type="text"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Název produktu"
        bind:value={productName}
        required
      />
    </div>

    <!-- Rich Text Editor -->
    <div class="mb-5">
      <div class="relative">
        <div class="mb-3 flex gap-3">
          <button
            type="button"
            class="px-4 py-2 bg-gray-200 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-300 transition"
            on:click={() => handleCommand("bold")}>Bold</button
          >
          <button
            type="button"
            class="px-4 py-2 bg-gray-200 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-300 transition"
            on:click={() => handleCommand("italic")}>Italic</button
          >
          <button
            type="button"
            class="px-4 py-2 bg-gray-200 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-300 transition"
            on:click={() => handleCommand("underline")}>Underline</button
          >
        </div>
        <div
          bind:this={editorRef}
          contenteditable="true"
          on:input={handleInput}
          class="w-full min-h-[150px] border border-gray-300 rounded-lg p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>

    <!-- Image Uploads -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      {#each [1, 2, 3, 4] as num}
        <div>
          <input
            on:change={(event) => handleFileUpload(event, num)}
            type="file"
            accept="image/jpeg"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      {/each}
    </div>

    <!-- Product Price and Quantity -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <input
          type="number"
          class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Cena"
          bind:value={productPrice}
          required
        />
      </div>
      <div>
        <input
          type="number"
          class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Množství"
          bind:value={productQuantity}
          required
        />
      </div>
    </div>

    <!-- Product Type Selection -->
    <div class="mb-5">
      <label for="productType" class="block text-gray-700 font-medium mb-1"
        >Typ produktu</label
      >
      <select
        name="productType"
        id="productType"
        class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        on:change={handleChange}
        required
      >
        <option value="" disabled selected>Select type</option>
        <option value="3dtisk">3D tisk</option>
        <option value="epoxid">Epoxid</option>
      </select>
    </div>

    <!-- Category Selection -->
    <div class="mb-6">
      <label for="category" class="block text-gray-700 font-medium mb-1"
        >Kategorie</label
      >
      <select
        name="category"
        id="category"
        class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        bind:value={categoryId}
        required
      >
        <option value="" disabled selected>Please Select</option>
        {#each $DisplayedCategories as Category}
          <option value={Category.CategoryId}>{Category.CategoryName}</option>
        {/each}
      </select>
    </div>

    <!-- Submit Button -->
    <div class="text-center">
      <input
        type="submit"
        value="Přidat produkt"
        class="px-8 py-3 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>
</form>

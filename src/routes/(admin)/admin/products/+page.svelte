<script lang="ts">
  import { getCookie } from "$/lib/cookie";
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { writable } from "svelte/store";

  let InputStyle =
    "p-1 border-black border-2 rounded-lg focus:outline-none w-[300px]";
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

  const handleSubmit = async () => {
    const object = {
      ProductName: productName,
      ProductDesc: productDesc,
      ProductImage1Url: productImage1,
      ProductImage2Url: productImage2,
      ProductImage3Url: productImage3,
      ProductImage4Url: productImage4,
      ProductPrice: productPrice,
      ProductQuantity: productQuantity,
      CategoryId: categoryId,
    };

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthToken,
        },
        body: JSON.stringify(object),
      });

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

<form action="" on:submit|preventDefault={handleSubmit}>
  <div class="flex flex-col gap-4 content-center items-center mt-5">
    <input
      type="text"
      class={InputStyle}
      placeholder="Název produktu"
      bind:value={productName}
    />
    <input
      type="text"
      class={InputStyle}
      placeholder="Popis produktu"
      bind:value={productDesc}
    />
    <input
      type="file"
      accept="image/*"
      class={InputStyle}
      on:change={(event) => handleFileUpload(event, 1)}
    />
    <input
      type="file"
      accept="image/*"
      class={InputStyle}
      on:change={(event) => handleFileUpload(event, 2)}
    />
    <input
      type="file"
      accept="image/*"
      class={InputStyle}
      on:change={(event) => handleFileUpload(event, 3)}
    />
    <input
      type="file"
      accept="image/*"
      class={InputStyle}
      on:change={(event) => handleFileUpload(event, 4)}
    />
    <input
      type="number"
      class={InputStyle}
      placeholder="Cena"
      bind:value={productPrice}
    />
    <input
      type="number"
      class={InputStyle}
      placeholder="Množství"
      bind:value={productQuantity}
    />
    <select
      name="productType"
      id="productType"
      class={InputStyle}
      on:change={handleChange}
    >
      <option value="3dtisk">3D tisk</option>
      <option value="epoxid">Epoxid</option>
    </select>
    <select
      name="category"
      id="category"
      class={InputStyle}
      bind:value={categoryId}
    >
      {#each $DisplayedCategories as Category}
        <option value={Category.CategoryId}>{Category.CategoryName}</option>
      {/each}
    </select>
    <input
      type="submit"
      class="p-1 border-2 border-black rounded-lg cursor-pointer"
    />
  </div>
</form>

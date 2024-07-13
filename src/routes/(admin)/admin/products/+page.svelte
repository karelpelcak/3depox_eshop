<script lang="ts">
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
  let productType = 0;
  let file: File | null = null;
  let base64String: string = "";

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
      ProductType: productType,
    };
    console.log(object)
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    let selectedValue = target.value;
    if (selectedValue === "3dtisk") {
      TypeVal = true;
    } else if (selectedValue === "epoxid") {
      TypeVal = false;
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
</script>

<form action="" on:submit={handleSubmit}>
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
    <select name="" id="" class={InputStyle}>
      {#if TypeVal}
        <option value="3dtisk">3D tisk</option>
      {:else if !TypeVal}
        <option value="epoxid">Epoxid</option>
      {/if}
    </select>
    <input
      type="submit"
      class="p-1 border-2 border-black rounded-lg cursor-pointer"
    />
  </div>
</form>

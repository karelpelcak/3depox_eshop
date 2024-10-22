<script lang="ts">
    import MdHome from 'svelte-icons/md/MdHome.svelte';
    import { CenaBezDPH } from '$/lib/functions';

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
    }

    interface ICategoryProps {
        CategoryName: string;
        CategoryFor: string;
        CategoryId: number;
    }

    
    export let data: { product: IProductProps; category: ICategoryProps };
    let ImageIdForObject = 0;

    const ImageObject = [
        {
            ImageUrl: data.product.ProductImage1Url,
            ImageId: 0,
        },
        {
            ImageUrl: data.product.ProductImage2Url,
            ImageId: 1,
        },
        {
            ImageUrl: data.product.ProductImage3Url,
            ImageId: 2,
        },
        {
            ImageUrl: data.product.ProductImage4Url,
            ImageId: 3,
        },
    ];

    function handleImageClick(imageId: number) {
        ImageIdForObject = imageId;
    }
</script>

<title>{data.product.ProductName}</title>

<div class="flex items-center pl-4 p-2 space-x-2 text-sm text-gray-600">
    <a href="/" class="h-[15] w-[15px] hover:underline">
        <MdHome />
    </a>
    <span class="text-gray-400">/</span>
    <a href={`/${data.category.CategoryFor}`} class="hover:underline">
        {data.category.CategoryFor}
    </a>
    <span class="text-gray-400">/</span>
    <a href={`/${data.category.CategoryFor}/${data.category.CategoryId}`} class="hover:underline">
        {data.category.CategoryName}
    </a>
</div>

<div class="flex flex-row contents-center items-center justify-center gap-36 m-10 mt-20">
    <div class="flex flex-col items-center gap-4">
        <img
            src={ImageObject[ImageIdForObject].ImageUrl}
            alt={data.product.ProductName}
            class="w-[312px] transition-all"
        />
        <div class="flex flex-row gap-2">
            {#each ImageObject as image}
                <button on:click={() => handleImageClick(image.ImageId)} class="relative">
                    <div class="relative group">
                        <img src={image.ImageUrl} alt={data.product.ProductName} class="w-[99px]" />
                        {#if image.ImageId === ImageIdForObject}
                            <div class="absolute inset-0 bg-black opacity-50 border-black border-2"></div>
                        {/if}
                    </div>
                </button>
            {/each}
        </div>
    </div>
    <div class="flex flex-col gap-8">
        <h1 class={`text-3xl`}>{data.product.ProductName}</h1>
        <p class="break-words w-[300px]">{@html data.product.ProductDesc}</p>

        <div class="flex justify-between">
            <div>
                <p class="text-gray-800 text-lg mt-2">{data.product.ProductPrice} Kč</p>
                <p class="text-gray-400 text-xs mt-2">
                    {CenaBezDPH(data.product.ProductPrice)} Kč bez DPH
                </p>
            </div>
            <p class="text-gray-800 mt-2">{data.product.ProductQuantity} ks</p>
        </div>
        <div class="flex justify-end">
            <button class="px-4 py-2 bg-black text-white rounded-lg">Koupit</button>
        </div>
    </div>
</div>

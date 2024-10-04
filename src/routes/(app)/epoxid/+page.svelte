<script lang="ts">
    import ProductCard from '$/lib/components/ProductCard.svelte';
    export let data;
    console.log('🚀 ~ data:', data);
</script>

<title>Epoxid</title>

<div>
    <div class="flex flex-wrap gap-4 p-4">
        {#each data.categoryList as category}
            <a
                href={`/epoxid/${category.CategoryId}`}
                class="inline-block px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-300 transition-colors border-2 hover:border-black"
            >
                {category.CategoryName}
            </a>
        {/each}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {#each data.productList as categoryProduct}
            {#each categoryProduct.products as product}
                <ProductCard
                    ProductId={product.ProductId}
                    ProductDesc={product.ProductDesc}
                    ProductImage1Url={product.ProductImage1Url}
                    ProductName={product.ProductName}
                    ProductPrice={product.ProductPrice}
                    ProductQuantity={product.ProductQuantity}
                />
            {/each}
        {/each}
    </div>
</div>

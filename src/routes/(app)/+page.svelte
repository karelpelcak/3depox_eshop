<script lang="ts">
    import { getCookie } from '$/lib/cookie';
    import { CenaBezDPH } from '$/lib/functions';
    import { addToCart } from '$/lib/stores';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    const AuthToken = getCookie('AuthToken');
    const ProductsList = writable<IProductProps[]>([]);

    interface IProductProps {
        ProductId: number;
        ProductName: string;
        ProductDesc: string;
        ProductImage1Url: string;
        ProductPrice: number;
        ProductQuantity: number;
    }

    const GetProducts = async () => {
        try {
            const response = await fetch('/api/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + AuthToken,
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

    const truncateDescription = (desc: string, maxLength: number) => {
        return desc.length > maxLength ? desc.substring(0, maxLength) + '...' : desc;
    };

    onMount(GetProducts);

    const handleAdd = (id: number) => {
        addToCart(id);
    };
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    {#each $ProductsList as product}
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={product.ProductImage1Url} alt={product.ProductName} class="w-full h-48 object-contain" />
            <div class="p-4">
                <a href={'/product/' + product.ProductId}
                    ><h1 class="text-lg font-semibold">{product.ProductName}</h1></a
                >
                <p class="text-gray-600 mt-2">
                    {truncateDescription(product.ProductDesc, 36)}
                </p>
                <div class="flex justify-between items-center mt-4">
                    <div>
                        <p class="text-gray-800 text -lg mt-2">{product.ProductPrice} Kč</p>
                        <p class="text-gray-400 text-xs mt-2">
                            {CenaBezDPH(product.ProductPrice)} Kč bez DPH
                        </p>
                    </div>
                    {#if product.ProductId}
                        <button on:click={() => handleAdd(product.ProductId)}>Pridat</button>
                    {/if}
                    <p class="text-gray-800 mt-2">{product.ProductQuantity} ks</p>
                    <amp-ad
                        width="100vw"
                        height="320"
                        type="adsense"
                        data-ad-client="ca-pub-5702656857463597"
                        data-ad-slot="7034287682"
                        data-auto-format="rspv"
                        data-full-width=""
                    >
                    </amp-ad>
                </div>
            </div>
        </div>
    {/each}
</div>

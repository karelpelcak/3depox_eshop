<script lang="ts">
  import { CenaBezDPH } from "../functions";

    export let ProductName: string;
    export let ProductImageUrl: string;
    export let ProductPrice: number;
    export let ProductQuantity: number;

    
</script>

<div class="flex flex-row h-12 w-[1100px] border-2 border-black my-1 rounded-md py-1 px-2 content-center items-center justify-between">
    <img src={ProductImageUrl} alt="item" class="w-8 h-8">
    <h1>{ProductName}</h1>
    <h1>cena: {ProductPrice}Kč</h1>
    <h1>Cena bez DPH: {CenaBezDPH(ProductPrice)}Kč</h1>
    <input type="number" class="border-black border-2 w-14 rounded-lg" bind:value={ProductQuantity}>
    <button>Smazat</button>
</div>
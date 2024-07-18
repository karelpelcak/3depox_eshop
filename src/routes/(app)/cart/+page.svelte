<script>
  import CartItem from "$/lib/components/CartItem.svelte";
</script>
<div class="flex flex-col items-center content-center mt-10">
    <h1 class="text-3xl font-bold">Nákupní košík</h1>
    <CartItem ProductName="Privesek" ProductImageUrl="https://3depox.cz/favicon.png" ProductPrice={59} ProductQuantity={5}/>
    <CartItem ProductName="Privesek" ProductImageUrl="https://3depox.cz/favicon.png" ProductPrice={59} ProductQuantity={5}/>
    <CartItem ProductName="Privesek" ProductImageUrl="https://3depox.cz/favicon.png" ProductPrice={59} ProductQuantity={5}/>
</div>
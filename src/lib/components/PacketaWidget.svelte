<script lang="ts">
    import { onMount } from 'svelte';
    let selectedPickupPoint: any = null;

    onMount(() => {
        const script = document.createElement('script');
        script.src = 'https://widget.packeta.com/v6/www/js/library.js';
        document.body.appendChild(script);
    });

    function openWidget() {
        if (window.Packeta) {
            window.Packeta.Widget.pick('packeta-pickup-point', (pickupPoint: any) => {
                selectedPickupPoint = pickupPoint;
            });
        }
    }
</script>

<div class="bg-gray-100 p-4 rounded-md">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Vyberte výdejní místo</h2>
    <button
        on:click={openWidget}
        class="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-700 transition duration-200"
    >
        Otevřít výběr místa
    </button>
    {#if selectedPickupPoint}
        <p class="mt-4 text-lg text-gray-700">
            Vybrané místo: <span class="font-semibold">{selectedPickupPoint?.name}</span>
        </p>
    {/if}
    <div id="packeta-pickup-point" class="mt-6"></div>
</div>

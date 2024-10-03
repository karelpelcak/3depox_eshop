<script lang="ts">
    import CartItemLayout from '$/lib/components/CartItemLayout.svelte';
    import PacketaWidget from '$/lib/components/PacketaWidget.svelte';
    import { getCookie } from '$/lib/cookie';
    import { cart } from '$/lib/stores';
    import type { CartItem } from '$/lib/types';
    import { onMount } from 'svelte';
    import MdLocalShipping from 'svelte-icons/md/MdLocalShipping.svelte';

    let items: CartItem[] = [];
    let selectedDelivery: string = '';
    let Sum = 0;

    cart.subscribe((value) => {
        items = value;
    });

    interface IUserDataDB {
        Username: string;
        Email: string;
        PhoneNumber: string;
        City: string;
        StreetAndNumber: string;
        PostalCode: string;
    }

    let UserData: IUserDataDB | null = null;
    let selected: string | null = null;

    const fetchPrize = async () => {
        const res = await fetch('/api/products/totalsum', {
            method: 'POST',
            body: JSON.stringify({
                idlist: items,
            }),
        });

        const data = await res.json();
        Sum = data.Price;
    };

    const handleDeliveryChange = async (event: Event) => {
        const target = event.target as HTMLSelectElement;
        selectedDelivery = target.value;

        if (selected !== selectedDelivery) {
            if (selected === 'zasilkovnaadresa') {
                Sum -= 109;
            } else if (selected === 'zasilkovna') {
                Sum -= 79;
            }
        }

        if (selectedDelivery === 'zasilkovnaadresa') {
            await HandleUserAddress();
            Sum += 109;
        } else if (selectedDelivery === 'zasilkovna') {
            Sum += 79;
        }

        selected = selectedDelivery;
    };

    const setUserDataFromDB = (DataObject: IUserDataDB) => {
        UserData = DataObject;
    };

    const HandleUserAddress = async () => {
        const JWTToken = await getCookie('AuthToken');

        const response = await fetch('/api/auth/addressanddata', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JWTToken}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
            const obj: IUserDataDB = data.Adr;
            setUserDataFromDB(obj);
        } else {
            console.log(data);
        }
    };

    onMount(fetchPrize);
</script>

<div class="flex flex-col items-center content-center mt-10">
    <h1 class="text-3xl font-bold">Nákupní košík</h1>
    {#if items.length === 0}
        <h1 class="text-3xl font-bold">Nákupní košík je prázdný</h1>
    {:else}
        <ul>
            {#each items as item}
                <CartItemLayout ProductId={item.id} ProductQuantity={item.quantity} />
            {/each}
        </ul>
    {/if}
</div>

<div class="flex flex-col lg:flex-row justify-between gap-10 px-6 lg:px-32 mt-10">
    <div class="flex-1">
        <div class="flex items-center gap-3 mb-4">
            <div class="h-6 w-6 text-blue-600">
                <MdLocalShipping />
            </div>
            <span class="hidden lg:block text-lg font-semibold">Zvolte dopravu</span>
        </div>
        <select
            name="delivery"
            id="delivery"
            on:change={handleDeliveryChange}
            class="border border-gray-300 rounded-md p-2 mb-4 w-full"
        >
            <option value="" disabled selected>Vyberte možnost doručení</option>
            <option value="zasilkovna">Zásilkovna +79Kč</option>
            <option value="zasilkovnaadresa">Zásilkovna na adresu +109Kč</option>
            <option value="osobniodber">Osobní odběr Zdarma</option>
        </select>
        {#if selectedDelivery === 'zasilkovna'}
            <PacketaWidget />
        {:else if selectedDelivery === 'osobniodber'}
            <div class="bg-gray-100 p-4 rounded-md">
                <h1 class="text-lg font-semibold">Velíkovská 235</h1>
                <h2 class="text-md text-gray-600">763 14, Zlín Štípa</h2>
                <p class="text-sm text-gray-600">
                    Jakmile bude objednávka připravená, budete kontaktování skrze E-mail a budete si moct dojet pro
                    objednávku.
                </p>
            </div>
        {:else if selectedDelivery === 'zasilkovnaadresa'}
            <div class="space-y-3">
                {#if UserData}
                    <input
                        type="text"
                        bind:value={UserData.StreetAndNumber}
                        placeholder="Ulice a číslo popisné"
                        class="border border-gray-300 rounded-md p-2 w-full"
                    />
                    <input
                        type="text"
                        bind:value={UserData.City}
                        placeholder="Obec / Město"
                        class="border border-gray-300 rounded-md p-2 w-full"
                    />
                    <input
                        type="text"
                        bind:value={UserData.PostalCode}
                        placeholder="PSČ"
                        class="border border-gray-300 rounded-md p-2 w-full"
                    />
                {:else}
                    <input
                        type="text"
                        placeholder="Ulice a číslo popisné"
                        class="border border-gray-300 rounded-md p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Obec / Město"
                        class="border border-gray-300 rounded-md p-2 w-full"
                    />
                    <input type="text" placeholder="PSČ" class="border border-gray-300 rounded-md p-2 w-full" />
                {/if}
            </div>
        {/if}
    </div>

    <div class="flex-1 bg-gray-50 p-4 rounded-md shadow-md">
        <h2 class="text-xl font-semibold">Platba</h2>
        <ul class="space-y-2 mt-2">
            <li>Platba kartou</li>
            <li>Hotově při převzetí</li>
            <li>Převodem na účet</li>
            <li>Dobírka +25Kč</li>
        </ul>
        <div class="mt-4">
            <h3 class="text-lg font-semibold">Celková cena:</h3>
            <p class="text-2xl font-bold text-green-600">{Sum} Kč</p>
        </div>
    </div>
</div>

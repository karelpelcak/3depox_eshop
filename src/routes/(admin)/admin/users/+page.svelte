<script lang="ts">
  import { getCookie } from "$/lib/cookie";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  interface IUserProps {
    Username: string;
    Email: string;
    PhoneNumber: string;
    StreetAndNumber: string;
    City: string;
    RoleId: number;
  }
  
  const AuthToken = getCookie("AuthToken");
  const users = writable<IUserProps[]>([]);

  const LoadUsers = async () => {
    const response = await fetch("/api/admin/allusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      users.set(data.UserList);
    } else {
      console.error(await response.json());
    }
  };

  onMount(LoadUsers);
</script>

<div class="container mx-auto px-4 py-8 ">
  <h2 class="text-2xl font-bold text-center mb-6 text-blue-900">Seznam Uživatelů</h2>
  <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
    <thead class="bg-blue-800 text-white">
      <tr>
        <th class="py-2 px-4 border-b min-w-[250px]">Uživatelské jméno</th>
        <th class="py-2 px-4 border-b min-w-[250px]">Email</th>
        <th class="py-2 px-4 border-b min-w-[250px]">Telefonní číslo</th>
        <th class="py-2 px-4 border-b min-w-[250px]">Adresa</th>
        <th class="py-2 px-4 border-b min-w-[250px]">Město</th>
        <th class="py-2 px-4 border-b min-w-[250px]">Role</th>
      </tr>
    </thead>
    <tbody>
      {#each $users as user}
        <tr class="hover:bg-gray-100 text-center transition-colors">
          <td class="py-2 px-4 border-b min-w-[250px]">{user.Username}</td>
          <td class="py-2 px-4 border-b min-w-[250px]">{user.Email}</td>
          <td class="py-2 px-4 border-b min-w-[250px]">{user.PhoneNumber}</td>
          <td class="py-2 px-4 border-b min-w-[250px]">{user.StreetAndNumber}</td>
          <td class="py-2 px-4 border-b min-w-[250px]">{user.City}</td>
          <td class="py-2 px-4 border-b min-w-[250px]">
            {#if user.RoleId === 1}
              Uživatel
            {:else if user.RoleId === 2}
              Admin
            {:else}
              Chyba
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

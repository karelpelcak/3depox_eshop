<script lang="ts">
  import { getCookie } from "$/lib/cookie";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  interface User {
    Username: string;
    Email: string;
    PhoneNumber: string;
    StreetAndNumber: string;
    City: string;
    RoleId: number;
  }
  
  const AuthToken = getCookie("AuthToken");
  const users = writable<User[]>([]);

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

<div class="container mx-auto px-4 py-8">
  <table class="min-w-full bg-white border border-gray-200">
    <thead>
      <tr>
        <th class="py-2 px-4 border-b">Username</th>
        <th class="py-2 px-4 border-b">Email</th>
        <th class="py-2 px-4 border-b">Phone Number</th>
        <th class="py-2 px-4 border-b">Street and Number</th>
        <th class="py-2 px-4 border-b">City</th>
        <th class="py-2 px-4 border-b">Role</th>
      </tr>
    </thead>
    <tbody>
      {#each $users as user}
        <tr class="hover:bg-gray-100 text-center">
          <td class="py-2 px-4 border-b">{user.Username}</td>
          <td class="py-2 px-4 border-b">{user.Email}</td>
          <td class="py-2 px-4 border-b">{user.PhoneNumber}</td>
          <td class="py-2 px-4 border-b">{user.StreetAndNumber}</td>
          <td class="py-2 px-4 border-b">{user.City}</td>
          {#if user.RoleId === 1}
            <td class="py-2 px-4 border-b">Uživatel</td>
          {:else if user.RoleId === 2}
            <td class="py-2 px-4 border-b">Admin</td>
          {:else}
            <td class="py-2 px-4 border-b">Error</td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

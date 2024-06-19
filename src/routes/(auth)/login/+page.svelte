<script lang="ts">
  import { Circle } from "svelte-loading-spinners";
  import { goto } from "$app/navigation";
  import { setCookie } from "$lib/cookie";

  let email = "";
  let password = "";
  let errorMessage = "";
  let Loading = false;

  const LoginFetch = async (event: Event) => {
    event.preventDefault();

    try {
      if (!email || !password) {
        errorMessage = "Email and Password are required";
        return;
      }
      Loading = true;
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        await setCookie("AuthToken", data.token);
        setTimeout(() => {
          goto("/");
          Loading = false;
        }, 1000);
      } else {
        errorMessage = data.error || "Login failed";
        Loading = false;
      }
    } catch (error) {
      console.error("Error during login fetch:", error);
      errorMessage = "Failed to login";
      Loading = false;
    }
  };
</script>

<div
  class="w-screen mt-[200px] flex justify-center content-center items-center"
>
  <div class="border-2 border-black p-4 rounded-md shadow-md">
    <form on:submit={LoginFetch} class="space-y-4">
      <div class="flex flex-col">
        <label for="email" class="text-sm font-semibold">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={email}
        />
      </div>
      <div class="flex flex-col">
        <label for="password" class="text-sm font-semibold">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={password}
        />
      </div>
      {#if errorMessage}
        <p class="text-red-500 text-sm">{errorMessage}</p>
      {/if}
      <div>
        {#if Loading}
          <div class="flex w-full justify-center">
            <Circle size="40" color="black" unit="px" duration="0.75s" />
          </div>
        {:else}
          <input
            type="submit"
            value="Přihlásit"
            class="border-2 px-2 rounded-lg cursor-pointer border-black"
          />
        {/if}
      </div>
    </form>
  </div>
</div>

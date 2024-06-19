<script lang="ts">
  import { goto } from "$app/navigation";
  import { Circle } from "svelte-loading-spinners";
  let errorMessage = "";
  let Loading = false;

  let username = "";
  let password = "";
  let email = "";
  let phoneNumber = "";
  let streetAndNumber = "";
  let city = "";
  let postalCode = "";

  const submitHadler = async (event: Event) => {
  event.preventDefault();
  try {
    if (
      !username ||
      !password ||
      !email ||
      !phoneNumber ||
      !streetAndNumber ||
      !city ||
      !postalCode
    ) {
      errorMessage = "All fields are required";
      return;
    }
    // Password validation checks
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password) || password.length < 8) {
      errorMessage =
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long. and lenght must be 8 or longer";
      return;
    }

    Loading = true;
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: username,
        Password: password,
        Email: email,
        PhoneNumber: phoneNumber,
        StreetAndNumber: streetAndNumber,
        City: city,
        PostalCode: postalCode,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setTimeout(() => {
        goto("/login");
        Loading = false;
      }, 1000);
    } else {
      errorMessage = data.error || "Registration failed";
    }
  } catch (error: any) {
    console.error("Error during registration:", error);
  }
};

</script>

<div
  class="w-screen mt-[100px] flex justify-center content-center items-center"
>
  <div class="border-2 border-black p-4 rounded-md shadow-md">
    <form on:submit={submitHadler} class="space-y-4">
      <div class="flex flex-col">
        <label for="username" class="text-sm font-semibold"
          >Jméno a Příjmení</label
        >
        <input
          type="text"
          name="username"
          id="username"
          class="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={username}
        />
      </div>

      <div class="flex flex-col">
        <label for="password" class="text-sm font-semibold">Heslo</label>
        <input
          type="password"
          name="password"
          id="password"
          class="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={password}
        />
      </div>

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
        <label for="telphone" class="text-sm font-semibold"
          >Telefoní číslo</label
        >
        <input
          type="tel"
          name="telphone"
          id="telphone"
          class="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={phoneNumber}
        />
      </div>

      <div class="flex flex-col">
        <label for="streetandnumber" class="text-sm font-semibold"
          >Adresa a číslo popisné</label
        >
        <input
          type="text"
          name="streetandnumber"
          id="streetandnumber"
          class="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={streetAndNumber}
        />
      </div>

      <div class="flex flex-col">
        <label for="city" class="text-sm font-semibold">Město</label>
        <input
          type="text"
          name="city"
          id="city"
          class="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={city}
        />
      </div>

      <div class="flex flex-col">
        <label for="postcode" class="text-sm font-semibold">PSČ</label>
        <input
          type="text"
          name="postcode"
          id="postcode"
          class="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={postalCode}
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

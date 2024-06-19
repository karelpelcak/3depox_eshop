<script>
  let username = "";
  let password = "";

  const handleSubmit = () => {
    console.log("username: " + username + " password: " + password);
  };
</script>

<form on:submit={handleSubmit}>
  <div
    class="w-screen h-screen bg-gray-800 flex flex-col justify-center items-center content-center gap-2"
  >
    <div class="flex flex-row gap-4">
      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        bind:value={username}
        class="bg-gray-800 border-2 border-black rounded-md p-1 focus:outline-none"
      />
    </div>
    <div class="flex flex-row gap-4">
      <label for="password">password</label>
      <input
        type="password"
        name="password"
        bind:value={password}
        class="bg-gray-800 border-2 border-black rounded-md p-1 focus:outline-none"
      />
    </div>
    <div class="flex flex-row gap-4">
      <input type="submit" value="Přihlásit" class="bg-gray-800" />
    </div>
  </div>
</form>

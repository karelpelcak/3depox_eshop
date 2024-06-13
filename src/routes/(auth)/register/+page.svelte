<script>
    let message = "h"

    async function fetchMessage() {
        try {
            const response = await fetch('/register/api');
            const data = await response.json();
            console.log(data);
            message = data;
        } catch (error) {
            console.error('Error fetching message:', error);
        }
    }
</script>

<button on:click={fetchMessage}>Get Message</button>
<p>{message}</p>

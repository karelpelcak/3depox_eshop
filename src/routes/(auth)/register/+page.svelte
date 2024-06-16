
<script>
    let to = '';
    let subject = '';
    let text = '';
  
    async function sendEmail() {
      try {
        const response = await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ to, subject, text }),
        });
  
        if (response.ok) {
          alert('Email sent successfully');
        } else {
          const { error } = await response.json();
          alert(`Failed to send email: ${error}`);
        }
      } catch (err) {
        console.error('Error sending email:', err);
        alert('Error sending email. Please try again later.');
      }
    }
  </script>
  
  <h1>Send Email</h1>
  
  <form on:submit|preventDefault={sendEmail}>
    <label>
      To:
      <input type="email" bind:value={to} required />
    </label>
    <label>
      Subject:
      <input type="text" bind:value={subject} required />
    </label>
    <label>
      Message:
      <textarea bind:value={text} rows="5" required></textarea>
    </label>
    <button type="submit">Send Email</button>
  </form>
  
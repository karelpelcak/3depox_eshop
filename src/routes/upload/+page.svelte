<script lang="ts">
    let file: any;
  
    const handleSubmit = async () => {
      const formData = new FormData();
      formData.append('fileToUpload', file);
  
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
  
      const result = await res.json();
      alert(result.message);
    };
  </script>
  
  <main>
    <h1>Upload an Image</h1>
    <form on:submit|preventDefault={handleSubmit}>
      <input type="file" bind:this={file} />
      <button type="submit">Upload Image</button>
    </form>
  </main>
  
  <style>
    main {
      padding: 1em;
    }
  
    h1 {
      margin-bottom: 1em;
    }
  
    input, button {
      margin-top: 0.5em;
    }
  </style>
  
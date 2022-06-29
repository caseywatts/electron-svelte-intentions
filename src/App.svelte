<script>
  const setTitle = () => {
    window.electronAPI.setTitle(title);
  };
  let title = "my intention";
</script>

<main>
  <h1>What is your intention?</h1>
  <form on:submit|preventDefault>
    <input style="dispaly:inline-block;" type="text" bind:value={title} on:change={setTitle} />
    <button on:click={setTitle}>Update</button>
  </form>
</main>

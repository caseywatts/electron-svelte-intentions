<script>
  export let name;
  const setTitle = () => {
    window.electronAPI.setTitle(title);
  };
  let title = "default title";
</script>

<main>
  <h1>What is your intention?</h1>
  <form on:submit|preventDefault>
    <input style="dispaly:inline-block;" type="text" bind:value={title} on:change={setTitle} />
    <button on:click={setTitle}>Update</button>
  </form>
</main>

<style>
  /* main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  } */
</style>

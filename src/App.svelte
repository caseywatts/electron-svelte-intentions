<script>
  import Mousetrap from "mousetrap";
  let title = "my intention";
  const setTitle = () => {
    window.electronAPI.setTitle(title);
  };
  Mousetrap.bind("ctrl+`", () => {
    debugger;
    window.electronAPI.toggleWindow();
  });
</script>

<main>
  <h1>What is your intention?</h1>
  <form on:submit|preventDefault>
    <input style="dispaly:inline-block;" type="text" bind:value={title} on:change={setTitle} />
    <button on:click={setTitle}>Update</button>
  </form>
</main>

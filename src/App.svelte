<script>
  // import Mousetrap from "mousetrap";
  let title = "";
  const setTitle = () => {
    window.electronAPI.setTitle(title);
  };
  const hideWindow = () => {
    window.electronAPI.toggleWindow();
  };
  const setTitleAndHideWindow = () => {
    setTitle();
    hideWindow();
  };
  // Mousetrap.bind("ctrl+`", () => {
  //   debugger;
  //   window.electronAPI.toggleWindow();
  // });
</script>

<main style="text-align:center; display:flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
  <div>
    <!-- <h2 style="margin-top:0px; font-weight:300;">What is your next intention?</h2> -->
  </div>
  <div>
    <form on:submit|preventDefault>
      <div><input autofocus class="intention-input" type="text" bind:value={title} placeholder="set your intention" on:keyup={setTitle} /></div>
      <div style="display:none; margin-top: 10px;"><button on:click={setTitleAndHideWindow}>Update</button></div>
    </form>
  </div>
</main>

<style>
  main {
    font-family: "Quicksand", sans-serif;
    font-weight: 300;
  }
  .intention-input {
    width: 300px;
    text-align: center;
  }
  /* input[type="text"]::first-line {
    background-color: gold;
  } */
</style>

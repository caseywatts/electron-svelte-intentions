<script>
  // import Mousetrap from "mousetrap";
  let placeholder = "set your intention";
  let title;
  const updateTitle = () => {
    // if it's an actual keystroke, not a control key?
    if (title.length > 0) {
      window.electronAPI.setTitle(title);
    }
  };
  const hideWindow = () => {
    windowClosedReset();
    window.electronAPI.toggleWindow();
  };
  const setTitleAndHideWindow = () => {
    updateTitle();
    hideWindow();
  };
  window.electronAPI.onAppBlurred(() => {
    windowClosedReset();
  });
  // Mousetrap.bind("ctrl+`", () => {
  //   debugger;
  //   window.electronAPI.toggleWindow();
  // });
  const windowClosedReset = () => {
    if (title.length > 0) {
      placeholder = title;
      title = "";
    }
  };
</script>

<main style="text-align:center; display:flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
  <div>
    <!-- <h2 style="margin-top:0px; font-weight:300;">What is your next intention?</h2> -->
  </div>
  <div>
    <form on:submit|preventDefault>
      <div><input autofocus class="intention-input" type="text" bind:value={title} {placeholder} on:keyup={updateTitle} /></div>
      <div style="display:none; margin-top: 10px;"><button on:click={setTitleAndHideWindow}>Update</button></div>
    </form>
  </div>
</main>

<style>
  main {
    font-family: "Quicksand", sans-serif;
    font-weight: 300;
    margin: 0;
    padding: 0;
  }
  form {
    margin: 0;
    padding: 0;
  }
  input {
    margin: 0;
    outline-color: #ae90da;
    outline-width: 10px;
  }
  /* input:focus {
    outline-color: red;
  } */
  .intention-input {
    width: 300px;
    text-align: center;
  }
  /* input[type="text"]::first-line {
    background-color: gold;
  } */
</style>

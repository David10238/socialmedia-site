<script>
  let email = "";
  let password = "";
  let name = "";

  async function onLogin() {
    console.log("Login " + email + password + name);
  }

  async function onSignUp() {
    console.log("Signup " + email + password + name);
  }
</script>

<div id="login-page">
  <div id="login-menu">
    <input
      class="login-menu-text"
      type="text"
      bind:value={email}
      placeholder="Email"
    />
    <input
      class="login-menu-text"
      type="text"
      bind:value={password}
      placeholder="Password"
    />
    <input
      class="login-menu-text"
      type="text"
      bind:value={name}
      placeholder="Name"
    />
    <button class="login-menu-button" on:click={onLogin}>LOGIN</button>
    <button class="login-menu-button" on:click={onSignUp}>SIGN UP</button>
  </div>
</div>

<style lang="scss">
  @import "src/styles/vars.scss";
  #login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #login-menu {
    background-color: $box-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
  .login-menu-button {
    color: $text-color;
    width: 380px;
    height: 50px;
  }
  .login-menu-text {
    color: $text-color;
    width: 400px;
    height: 50px;
    padding: 7px;
    border: 0;
    border-radius: 0;
    text-align: left;
    outline: none;
  }
</style>

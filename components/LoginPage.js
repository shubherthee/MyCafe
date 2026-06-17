const LoginPage = {
  template: `
    <div class="glass-panel">
      <h2>Staff Login</h2>
      <form @submit.prevent="loginStaff">
        <div class="input-group">
          <input v-model="login.username" placeholder="Username" required>
        </div>
        <div class="input-group">
          <input v-model="login.password" type="password" placeholder="Password" required>
        </div>
        <button type="submit" class="btn-primary">Login</button>
      </form>
      <p class="message" v-if="message">{{ message }}</p>
    </div>
  `,
  data() {
    return {
      login: { username: "", password: "" },
      message: ""
    };
  },
  methods: {
    async loginStaff() {
      try {
        const response = await fetch(API_CONFIG.BASE_URL + "/login", {
          method: "POST",
          headers: publicHeaders(),
          body: JSON.stringify({
            username: this.login.username,
            password: this.login.password
          })
        });
        
        const result = await response.json();
        
        if (response.ok && result.token) {
          setToken(result.token);
          this.message = "Login successful.";
          this.$emit('login-success'); // Tells the main app we are logged in
        } else {
          this.message = result.message || "Invalid login.";
        }
      } catch (error) {
        this.message = "Unable to connect to server.";
        console.error(error);
      }
    }
  }
};
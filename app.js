const app = Vue.createApp({

  data() {
    return {
      menuItems: [],
      message: "",
      isLoggedIn: !!getToken(),
      token: getToken() || "",
      login: {
        username: "",
        password: ""
      },
      newMenu: {
        menu_name: "",
        category: "",
        price: "",
        availability: "Available"
      },
      editId: null,
      editMenu: {
        menu_name: "",
        category: "",
        price: "",
        availability: "Available"
      }
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
          this.token = result.token;
          this.isLoggedIn = true;
          this.message = "Login successful.";
          this.login = { username: "", password: "" };
        } else {
          this.message = handleApiError(response, result);
        }
      } catch (error) {
        this.message = "Unable to connect to server.";
        console.error(error);
      }
    },

    logoutStaff() {
      clearToken();
      this.token = "";
      this.isLoggedIn = false;
      this.message = "Logged out successfully.";
    },

    async fetchMenu() {
      try {
        const response = await fetch(API_CONFIG.BASE_URL + "/menu");
        this.menuItems = await response.json();
      } catch (error) {
        this.message = "Failed to load menu data.";
        console.error(error);
      }
    },

    async addMenu() {
      try {
        const response = await fetch(API_CONFIG.BASE_URL + "/menu", {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(this.newMenu)
        });
        const result = await response.json();
        if (response.ok) {
          this.message = "Menu item added successfully.";
          this.newMenu = {
            menu_name: "",
            category: "",
            price: "",
            availability: "Available"
          };
          this.fetchMenu();
        } else {
          this.message = handleApiError(response, result);
        }
      } catch (error) {
        this.message = "Server connection error.";
        console.error(error);
      }
    },

    startEdit(item) {
      this.editId = item.menu_id;
      this.editMenu = { ...item };
    },

    cancelEdit() {
      this.editId = null;
    },

    async updateMenu(item) {
      try {
        const response = await fetch(API_CONFIG.BASE_URL + "/menu/" + item.menu_id, {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify(this.editMenu)
        });
        const result = await response.json();
        if (response.ok) {
          this.message = "Menu item updated successfully.";
          this.editId = null;
          this.fetchMenu();
        } else {
          this.message = handleApiError(response, result);
        }
      } catch (error) {
        this.message = "Unable to update menu.";
        console.error(error);
      }
    },

    async deleteMenu(id) {
      if (!confirm("Are you sure you want to delete this menu item?")) {
        return;
      }
      try {
        const response = await fetch(API_CONFIG.BASE_URL + "/menu/" + id, {
          method: "DELETE",
          headers: authHeaders()
        });
        const result = await response.json();
        if (response.ok) {
          this.message = "Menu item deleted successfully.";
          this.fetchMenu();
        } else {
          this.message = handleApiError(response, result);
        }
      } catch (error) {
        this.message = "Unable to delete menu.";
        console.error(error);
      }
    }

  },

  mounted() {
    this.fetchMenu();
  }

});

app.mount("#app");
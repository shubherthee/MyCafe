const MenuPage = {
  template: `
    <div class="menu-container">
      <h2>Cafe Menu</h2>
      <p v-if="message" class="message">{{ message }}</p>
      <div class="menu-grid">
        <div v-for="item in menuItems" :key="item.menu_id" class="glass-card menu-card">
          <h3>{{ item.menu_name }}</h3>
          <p class="category">{{ item.category }}</p>
          <p class="price">RM {{ item.price }}</p>
          <span class="badge">{{ item.availability }}</span>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      menuItems: [],
      message: ""
    };
  },
  mounted() {
    this.fetchMenu();
  },
  methods: {
    async fetchMenu() {
      try {
        const response = await fetch(API_CONFIG.BASE_URL + "/menu");
        this.menuItems = await response.json();
      } catch (error) {
        this.message = "Failed to load menu data.";
        console.error(error);
      }
    }
  }
};
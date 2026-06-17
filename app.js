const API_BASE = API_CONFIG.BASE_URL;

const app = Vue.createApp({

  data() {
    return {
      token: localStorage.getItem('mc_token') || '',
      loginForm: {
        username: '',
        password: ''
      },
      menuItems: [],
      newMenu: {
        menu_name: '',
        category: '',
        price: '',
        availability: 'Available'
      },
      editId: null,
      editMenu: {
        menu_name: '',
        category: '',
        price: '',
        availability: 'Available'
      }
    };
  },

  methods: {

    loginStaff() {
      fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.loginForm)
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          this.token = data.token;
          localStorage.setItem('mc_token', data.token);
          alert('Login successful!');
          this.loginForm = { username: '', password: '' };
        } else {
          alert(data.message || 'Login failed');
        }
      })
      .catch(error => console.error('Login error:', error));
    },

    authHeaders() {
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      };
    },

    logoutStaff() {
      this.token = '';
      localStorage.removeItem('mc_token');
      alert('Logged out successfully');
    },

    fetchMenu() {
      fetch(`${API_BASE}/menu`)
        .then(response => response.json())
        .then(data => {
          this.menuItems = data;
        })
        .catch(error => {
          console.error('API error:', error);
        });
    },

    addMenu() {
      fetch(`${API_BASE}/menu`, {
        method: 'POST',
        headers: this.authHeaders(),
        body: JSON.stringify(this.newMenu)
      })
      .then(response => response.json())
      .then(() => {
        this.fetchMenu();
        this.newMenu = {
          menu_name: '',
          category: '',
          price: '',
          availability: 'Available'
        };
      });
    },

    deleteMenu(id) {
      fetch(`${API_BASE}/menu/${id}`, {
        method: 'DELETE',
        headers: this.authHeaders()
      })
      .then(response => response.json())
      .then(() => {
        this.fetchMenu();
      });
    },

    startEdit(item) {
      this.editId = item.menu_id;
      this.editMenu = {
        menu_name: item.menu_name,
        category: item.category,
        price: item.price,
        availability: item.availability
      };
    },

    updateMenu(id) {
      fetch(`${API_BASE}/menu/${id}`, {
        method: 'PUT',
        headers: this.authHeaders(),
        body: JSON.stringify(this.editMenu)
      })
      .then(response => response.json())
      .then(() => {
        this.fetchMenu();
        this.cancelEdit();
      });
    },

    cancelEdit() {
      this.editId = null;
      this.editMenu = {
        menu_name: '',
        category: '',
        price: '',
        availability: 'Available'
      };
    }
  },

  mounted() {
    this.fetchMenu();
  }

});

app.mount('#app');
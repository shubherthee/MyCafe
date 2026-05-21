const API_URL = 'http://localhost/mycampus-cafe-slim-api/public/api/menu';

const app = Vue.createApp({

  data() {
    return {

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

    fetchMenu() {

      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          this.menuItems = data;
        })
        .catch(error => {
          console.error('API error:', error);
        });

    },

    addMenu() {

      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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

      fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
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

      fetch(`${API_URL}/${id}`, {

        method: 'PUT',

        headers: {
          'Content-Type': 'application/json'
        },

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
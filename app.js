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
 }
 };
 },
 methods: {
 fetchMenu() {
 fetch(API_URL)
 .then(response => response.json())
 .then(data => this.menuItems = data)
 .catch(error => console.error('API error:', error));
 },
 addMenu() {
 fetch(API_URL, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(this.newMenu)
 })
 .then(response => response.json())
 .then(() => {
 this.fetchMenu();
 this.newMenu = { menu_name: '', category: '', price: '', availability: 'Available' };
 });
 },
 deleteMenu(id) {
 fetch(`${API_URL}/${id}`, { method: 'DELETE' })
 .then(response => response.json())
 .then(() => this.fetchMenu());
 }
 },
 mounted() {
 this.fetchMenu();
 }
});
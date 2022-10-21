import { createApp } from 'vue';
import App from './App.vue';

const app = document.createElement('div');
document.body.appendChild(app);
setTimeout(() => {
  createApp(App).mount(app);
});

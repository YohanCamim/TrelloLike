import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import './styles/app.css';
import VueTilt from 'vue-tilt.js'

createApp(App).use(router).use(store).use(VueTilt).mount('#app')

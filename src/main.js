import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/style.scss'
import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './routers/routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')

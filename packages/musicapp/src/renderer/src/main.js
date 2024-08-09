import { createApp } from 'vue'
import './assets/css/all.min.css'
import './assets/css/style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')

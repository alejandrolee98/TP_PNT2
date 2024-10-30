import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './routes/router.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')

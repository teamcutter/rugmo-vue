import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://172.31.84.228:80'

createApp(App).use(store).use(router, axios).mount('#app')

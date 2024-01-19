import './style.css'
import 'virtual:uno.css';

import { createApp } from 'vue'
import App from './App.vue'
import { routers } from './routers'
import store from './store'

const app = createApp(App)

app.use(routers)
app.use(store)
// 挂载应用
app.mount('#app')

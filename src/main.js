import './style.css';
import 'virtual:uno.css';
import 'virtual:svg-icons-register';
import 'normalize.css';

import { createApp } from 'vue';
import App from './App.vue';
import { routers } from './routers';
import store from './store';
import SvgIcon from '@/components/SvgIcon.vue';

const app = createApp(App);
// 全局组件挂载
app.component('svg-icon', SvgIcon);

app.use(routers);
app.use(store);
// 挂载应用
app.mount('#app');

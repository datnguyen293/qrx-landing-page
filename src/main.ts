import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './locales';
import ElementPlus from 'element-plus';
import {createPinia} from "pinia";

import 'element-plus/dist/index.css'
import './assets/style/main.scss';

const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(ElementPlus)
app.use(router);
app.use(i18n);

app.mount('#app');

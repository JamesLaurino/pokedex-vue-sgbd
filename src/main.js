import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/Router.js";
import {createI18n} from "vue-i18n";

import LangService from "./service/LangService.js";

const en = await LangService.fetchLangEn();
const fr =  await LangService.fetchLangFr();

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'fr',
    messages: {
        en,
        fr
    }
});

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
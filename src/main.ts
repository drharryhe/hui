import {createApp} from "vue";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/styles/index.scss";
import i18n from "@/i18n";
import {Dialog, Loading, Notify, Quasar} from "quasar";
import {createPinia} from 'pinia'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

createApp(App)
    .use(router)
    .use(i18n)
    .use(createPinia())
    .use(Quasar, {
        plugins: {
            Notify,
            Dialog,
            Loading
        },
        animations: 'all',
        config: {
            notify: {
                classes: "notify",
                position: "top",
                timeout: 1000
            },
            brand: {
                primary: "#3aa675",
                secondary: "#349469",
                accent: "#3aa675",
                positive: "#318a62",
                negative: "#aa0000",
                info: "#349469",
                warning: "#ceab00",
                dark: "#2b313a"
            }
        }
    })
    .mount("#app");

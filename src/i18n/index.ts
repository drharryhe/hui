import en from '@/i18n/lang/en'
import zhCN from '@/i18n/lang/zh-cn'
import {createI18n} from "vue-i18n";

const i18n = createI18n({
    locale: "zh-CN",
    fallbackLocale: "zh-CN",
    globalInjection: true,
    messages: {
        'en': en,
        'zh-CN': zhCN
    },
});

export default i18n;
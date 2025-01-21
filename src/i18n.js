import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import it from "./resources/locales/it.json";
import en from "./resources/locales/en.json";

i18n.use(initReactI18next).init({
    resources: {
        it: {
            translation: it
        },
        en: {
            translation: en
        }
    },
    debug: false,
    lng: localStorage.getItem("lang") ?? navigator.language?.split("-")[0] ?? "it",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
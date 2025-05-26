import { createI18n } from "vue-i18n";
import en from "./locales/en";
import es from "./locales/es";
import ptBR from "./locales/pt-BR";

const savedLocale = localStorage.getItem("locale");
const browserLocale = navigator.language.split("-")[0];

const i18n = createI18n({
  legacy: false,
  locale:
    savedLocale ||
    (["pt", "es", "en"].includes(browserLocale) ? browserLocale : "en"),
  fallbackLocale: "en",
  messages: {
    en,
    es,
    "pt-BR": ptBR,
  },
});

export default i18n;

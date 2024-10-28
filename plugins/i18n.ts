import { createI18n } from "vue-i18n";
import zh from "./locales/zh";
import en from "./locales/en";

export const i18n: any = createI18n({
  legacy: false,
  globalInjection: true,
  warnHtmlMessage: false,
  locale: "zh",
  messages: {
    en,
    zh,
  },
});
export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(i18n);
});

export const $i18n = i18n.global.t.bind(i18n.global);

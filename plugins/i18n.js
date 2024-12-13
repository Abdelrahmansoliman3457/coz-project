import { createI18n } from "vue-i18n";
import en from "~/i18n/lang/en.json";
import ar from "~/i18n/lang/ar.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en",
    messages: {
      en,
      ar,
    },
  });

  vueApp.use(i18n);
});

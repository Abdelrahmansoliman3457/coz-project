export default defineNuxtConfig({
  target: "static",
  ssr: false,
  generate: {
    fallback: true,
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: {
      title: "Coz",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        //   {
        //     name: "description",
        //     content:
        //       "شركة مروج الدولي للمعجنات. شركة متخصصة في إنتاج الفطائر وجميع أنواع المعجنات والمخبوزات المميزة بحشوات متعددة، ومتخصصون في إنتاج الكيك والنواشف بأنواعها المت",
        //   },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    },
  },
  css: [
    "bootstrap/dist/css/bootstrap.rtl.css",
    "primevue/resources/themes/lara-light-green/theme.css",
    "primeicons/primeicons.css",
    // "/node_modules/primeflex/primeflex.css",
    "~/assets/css/main.scss",
  ],

//   build: {
//     transpile: ["@fawmi/vue-google-maps"],
//   },
  // plugins: ["~/plugins/axios.ts"],
  modules: [
    "nuxt-primevue",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "vue3-carousel-nuxt",
  ],
  build: {
    transpile: ["@fawmi/vue-google-maps"],
  },
  devtools: { enabled: false },
});

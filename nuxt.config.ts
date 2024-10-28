// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "YoHub",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        {
          name: "description",
          content: "YoHub",
        }
      ],
    },
  },
  devServer: {
    host: "0.0.0.0",
    port: 3001,
  },
  compatibilityDate: "2024-10-03",
  css: ['@/assets/css/common.scss', '@/assets/css/main.css'],
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-icons"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});

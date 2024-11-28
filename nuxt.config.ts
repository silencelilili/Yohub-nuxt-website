// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'YoHub',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          name: 'description',
          content: 'YoHub',
        },
      ],
    },
    buildAssetsDir: '/static/', // 文件夹名称, 默认为:"/_nuxt/"
    rootId: 'yohub', // 自定义根元素的id，默认为:"__nuxt"
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001,
  },
  compatibilityDate: '2024-10-03',
  css: ['@/assets/css/common.scss'],
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxt-icons', '@nuxt/image', '@element-plus/nuxt', '@unocss/nuxt'],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/variables.scss" as element;',
          api: 'modern-compiler', // 解决弃用告警：Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://1119.yohub.online/', // 目标跨域服务器地址 https://yohub.online
          changeOrigin: true, // 重要：需要更改源
          // 可选的路由重写规则
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },
  elementPlus: {
    // icon: "ElIcon",
    importStyle: 'scss',
  },
  runtimeConfig: {
    public: {
      baseUrl: '/api',
    },
  },
  image: {
    provider: 'assets',
  },
  // nitro: {
  //   output: {
  //     publicDir: "./dist/public",
  //     dir: "./dist",
  //     serverDir: "./dist/server",
  //   },
  // }
});

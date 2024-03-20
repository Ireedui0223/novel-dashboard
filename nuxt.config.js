import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "Novel Investment",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.jpg" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["./assets/styles/main.css", "./assets/styles/typography.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "@/plugins/portal-vue.js", mode: "client", ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/google-fonts",
    "@nuxtjs/axios",
  ],

  googleFonts: {
    families: {
      Roboto: [300, 500, 700],
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [["cookie-universal-nuxt", { alias: "cookiz" }], , "@nuxtjs/apollo"],

  apollo: {
    tokenName: "token",
    authenticationType: "",
    clientConfigs: {
      default: {
        // httpEndpoint: "http://localhost:8080",
        httpEndpoint: "https://graphql.novelinvestment.mn",
        tokenName: "token",
        authenticationType: "",
      },
    },
    defaultOptions: {
      $query: {
        loadingKey: "loading",
        fetchPolicy: "network-only",
      },
      $mutation: {
        loadingKey: "loading",
        fetchPolicy: "network-only",
      },
    },
    cookieAttributes: {
      domain: "novelinvestment.mn",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    optionsPath: "./vuetify.options.js",
    treeShake: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 4000,
    // host: '0.0.0.0'
  },
};

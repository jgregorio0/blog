const axios = require("axios");
const firebaseEnv = require("./firebase.env");

module.exports = {
  /*
  ** Build configuration
  */
  build: {},
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {},
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: "#3B8070"
  },
  /*
  ** Modules
  */
  modules: ["@nuxtjs/pwa", "bootstrap-vue/nuxt", "nuxt-fontawesome"],
  /*
  ** fontawesome
  */
  fontawesome: {
    component: "fa",
    imports: [
      {
        set: "@fortawesome/free-solid-svg-icons",
        icons: ["faExternalLinkAlt"]
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: ["~assets/styles/main.css"],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ["~plugins/core-components.js", "~plugins/fireinit.js"],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    maxChunkSize: 300000,
    extend(config, ctx) {}
  },
  env: {
    firebaseUrl: process.env.FIREBASE_URL || firebaseEnv.databaseURL,
    firebaseSignUpUrl:
      process.env.FIREBASE_SIGN_UP_URL ||
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=",
    firebaseLoginUrl:
      process.env.FIREBASE_LOGIN_URL ||
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=",
    firebaseApiKey: process.env.FIREBASE_API_KEY || firebaseEnv.apiKey
  },
  router: {
    base: "/blog/",
    extendRoutes(routes, resolve) {
      routes.push({
        path: "*",
        component: resolve(__dirname, "pages/index.vue")
      });
    },
    linkActiveClass: "active"
  },
  transition: {
    name: "fade",
    mode: "out-in"
  },
  generate: {
    routes: function() {
      return axios
        .get(firebaseEnv.databaseURL + "/posts.json")
        .then(res => {
          const postsArray = [];
          for (let key in res.data) {
            postsArray.push({
              route: "/posts/" + key,
              payload: { postData: res.data[key] }
            });
          }
          return postsArray;
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};

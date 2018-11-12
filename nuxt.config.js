const axios = require("axios");
// todo for generate 
// const firebaseEnv = require("./firebase.env");

module.exports = {
  mode: "universal",
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
        icons: [
          "faExternalLinkAlt",
          "faPencilAlt",
          "faTimes",
          "faSignOutAlt",
          "faPlusSquare",
          "faSave",
          "faBan",
          "faDownload"
        ]
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
  plugins: ["~plugins/core-components.js"],
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
    firebaseUrl: process.env.databaseURL /*  || firebaseEnv.databaseURL */,
    firebaseSignUpUrl:
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=",
    firebaseLoginUrl:
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=",
    firebaseApiKey: process.env.apiKey /*  || firebaseEnv.apiKey */,
    apiKey: "" + process.env.apiKey,
    authDomain: "" + process.env.authDomain,
    databaseURL: "" + process.env.databaseURL,
    projectId: "" + process.env.projectId,
    storageBucket: "" + process.env.storageBucket,
    messagingSenderId: "" + process.env.messagingSenderId
  },
  router: {
    /* base: "/blog/", */
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
        .get(firebaseEnv.firestoreURL + "posts/")
        .then(res => {
          // console.log('res :', res);
          // console.log("res.data :", res.data);
          const postsArray = [];
          for (let key in res.data) {
            postsArray.push({ route: "/posts/" + key });
          }
          return postsArray;
        })
        .catch(e => {
          console.error(e);
        });

      /* return axios
        .get(firebaseEnv.databaseURL + "/posts.json")
        .then(res => {
          const postsArray = [];
          for (let key in res.data) {
            postsArray.push({
              route: "/posts/" + key/* ,
              payload: { loadedPosts: res.data } */
      /*});
          }
          return postsArray;
        })
        .catch(e => {
          console.error(e);
        }); */
    }
  }
};

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
  modules: ["@nuxtjs/pwa"],
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
    firebaseUrl:
      process.env.FIREBASE_URL || "https://blog-17d1f.firebaseio.com",
    firebaseSignUpUrl:
      process.env.FIREBASE_SIGN_UP_URL ||
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=",
    firebaseLoginUrl:
      process.env.FIREBASE_LOGIN_URL ||
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=",
    firebaseApiKey:
      process.env.FIREBASE_API_KEY || "AIzaSyAganj3oUMo86yAr4sO0s1KCvxiqXU2bLQ"
  },
  router: {
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
        .get(process.env.firebaseUrl + '/posts.json')
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

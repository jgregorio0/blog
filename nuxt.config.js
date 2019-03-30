const axios = require("axios");
// todo for generate
// const firebaseEnv = require("./firebase.env");

module.exports = {
  mode: "universal",
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
  /*
   ** Headers
   ** Common headers are already provided by @nuxtjs/pwa preset
   */
  head: {
    link: [
      {
        href:
          "https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic",
        rel: "stylesheet",
        type: "text/css"
      },
      {
        href:
          "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800",
        rel: "stylesheet",
        type: "text/css"
      }
    ],
    script: [
      {
        src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        body: true,
        defer: true
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
        body: true,
        defer: true
      },
      {
        src:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
        body: true,
        defer: true
      },
      {
        src: "/vendor/theme/clean-blog.min.js",
        body: true,
        defer: true
      }
    ]
  },
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
  modules: [
    "@nuxtjs/pwa",
    "bootstrap-vue/nuxt",
    "nuxt-fontawesome",
    "@nuxtjs/sitemap"
  ],
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

  /**
   * Sitemap
   */
  sitemap: {
    path: "/sitemap.xml",
    hostname: "https://blog.jgregorio.es",
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    exclude: ["/admin", "/admin/**"],
    routes() {
      return axios
        .get(
          "https://firestore.googleapis.com/v1beta1/projects/blog-17d1f/databases/(default)/documents/posts/"
        )
        .then(res => {
          const postsArray = [];
          for (let fields of res.data.documents) {
            if (
              fields &&
              fields.fields &&
              fields.fields.id &&
              fields.fields.id.stringValue
            ) {
              postsArray.push("/posts/" + fields.fields.id.stringValue);
            }
          }
          return postsArray;
        })
        .catch(e => {
          console.error(e);
        });
    }
  },

  /*
   ** Global CSS
   */
  css: ["~assets/styles/main.css", "~assets/styles/clean-blog.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~plugins/core-components.js"],
  /**
   * Environment variables
   */
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
        .get(
          "https://firestore.googleapis.com/v1beta1/projects/blog-17d1f/databases/(default)/documents/posts/"
        )
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
      /* });
          }
          return postsArray;
        })
        .catch(e => {
          console.error(e);
        }); */
    }
  }
};

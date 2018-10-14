import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";
import firebase from "firebase";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const iPost = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[iPost] = editedPost;
      },
      rmPost(state, postId) {
        const iPost = state.loadedPosts.findIndex(post => post.id === postId);
        state.loadedPosts.splice(iPost, 1);
      },
      setToken(state, token) {
        // // console.log("setToken", token);
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        //  console.log("nuxtServerInit");
         return new Promise((resolve, reject)=>{
          firebase
            .database()
            .ref("posts")
            .orderByChild("updatedDate")
            .on("value", snapshot => {
              // get list from firebase
              // console.log("snapshot", snapshot);
              let data = snapshot.val();
              const postsArray = [];
              for (let key in data) {
                postsArray.push({ ...data[key], id: key });
              }
              vuexContext.commit("setPosts", postsArray);
              resolve()
            });
         })

           // AXIOS
        /* return axios
          .get(process.env.firebaseUrl + "/posts.json")
          .then(res => {
            const postsArray = [];
            for (let key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch(e => {
            console.error(e);
          }); */
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      addPost(vuexContext, post) {
        return firebase
          .database()
          .ref("posts")
          .push(post)
          .then(res => {
            vuexContext.commit("addPost", { ...post, id: res.data.name });
          })
          .catch(e => {
            console.error(e);
          });
      },
      editPost(vuexContext, editedPost) {
        return firebase
          .database()
          .ref("posts/" + editedPost.id)
          .set(editedPost)
          .then(res => {
            vuexContext.commit("addPost", {
              ...post,
              id: res.data.name
            });
          })
          .catch(e => {
            console.error(e);
          });
      },
      rmPost(vuexContext, postId) {
        return firebase
          .database()
          .ref("posts/" + postId)
          .set(null)
          .then(res => {
            vuexContext.commit("rmPost", {
              ...post,
              id: res.data.name
            });
          })
          .catch(e => {
            console.error(e);
          });
      },
      authUser(vuexContext, authData) {
        // console.log("authUser", authData);
        // Login
        return firebase
          .auth()
          .signInWithEmailAndPassword(authData.email, authData.pass)
          .then(loginRes => {
            // console.log("authUser res", loginRes);
            loginRes.user
              .getIdTokenResult()
              .then(tokenRes => {
                // console.log("authUser res", tokenRes);
                const token = tokenRes.token;
                const expirationTime = new Date(
                  tokenRes.expirationTime
                ).getTime();

                vuexContext.commit("setToken", token);
                Cookie.set("token", token);
                Cookie.set("tokenExpiration", expirationTime);
              })
              .catch(e => console.error(e));
          })
          .catch(e => console.error(e));
      },
      initAuth(vuexContext, req) {
        // console.log("initAuth");
        let token,
          tokenExpiration = null;
        if (!process.client && req && req.headers.cookie) {
          // only server
          token = req.headers.cookie.split(";").find(c => {
            if (c.trim().startsWith("token=")) {
              return c.split("=")[1];
            }
          });
          tokenExpiration = req.headers.cookie.split(";").find(c => {
            if (c.trim().startsWith("tokenExpiration=")) {
              return c.split("=")[1];
            }
          });
        } else if (process.client) {
          // only client
          token = Cookie.get("token");
          tokenExpiration = Cookie.get("tokenExpiration");
        }
        // console.log("token", token);
        // console.log("tokenExpiration", tokenExpiration);
        if (token && new Date().getTime() < Number(tokenExpiration)) {
          // console.log("token found", token);
          // load token if exists
          vuexContext.commit("setToken", token);
        } else {
          // clear if undefined or expired token
          vuexContext.dispatch("logout");
        }
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("token");
        Cookie.remove("tokenExpiration");
      }
    }
  });
};

export default createStore;

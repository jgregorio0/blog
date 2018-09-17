import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    getters: {
      loadedPosts (state) {
        return state.loadedPosts
      },
      isAuthenticated (state) {
        return state.token != null
      }
    },
    mutations: {
      setPosts (state, posts) {
        state.loadedPosts = posts
      },
      addPost (state, post) {
        state.loadedPosts.push(post)
      },
      editPost (state, editedPost) {
        const iPost = state.loadedPosts.findIndex(post => post.id === editedPost.id)
        state.loadedPosts[iPost] = editedPost
      },
      rmPost (state, postId) {
        const iPost = state.loadedPosts.findIndex(post => post.id === postId)
        state.loadedPosts.splice(iPost, 1)
      },
      setToken (state, token) {
        state.token = token
      },
      clearToken (state) {
        state.token = null
      }
    },
    actions: {
      nuxtServerInit (vuexContext, context) {
        return axios.get(process.env.firebaseUrl + '/posts.json')
          .then(res => {
            const postsArray = []
            for (let key in res.data) {
              postsArray.push({...res.data[key], id: key})
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch(e => {
            console.error(e)
          })
      },
      setPosts (vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      addPost (vuexContext, post) {
        return axios.post(process.env.firebaseUrl + '/posts.json?auth=' + vuexContext.state.token, post)
          .then(res => {
            vuexContext.commit('addPost', {...post, id: res.data.name})
          })
          .catch(e => {
            console.error(e)
          })
      },
      editPost (vuexContext, editedPost) {
        return axios.put(process.env.firebaseUrl + '/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
          .then(res => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e => {
            console.error(e)
          })
      },
      rmPost (vuexContext, postId) {
        return axios.delete(process.env.firebaseUrl + '/posts/' + postId + '.json?auth=' + vuexContext.state.token)
          .then(res => {
            vuexContext.commit('rmPost', postId)
          })
          .catch(e => {
            console.error(e)
          })
      },
      authUser (vuexContext, authData) {
        // Login
        let url = process.env.firebaseLoginUrl

        return axios.post(url + process.env.firebaseApiKey,
          {
            email: authData.email,
            password: authData.pass,
            returnSecureToken: true
          })
          .then(res => {
            const token = res.data.idToken;
            const expiresInMillis = Number(res.data.expiresIn) * 1000;
            const expiration = new Date().getTime() + expiresInMillis;

            vuexContext.commit('setToken', token)
            localStorage.setItem('token', token)
            localStorage.setItem('tokenExpiration', expiration)
            Cookie.set('token', token)
            Cookie.set('tokenExpiration', expiration)
          })
          .catch(e => console.error(e))
      },
      initAuth (vuexContext, req) {
        let token, tokenExpiration = null
        if (!process.client && req && req.headers.cookie) {
          // server only
          token = req.headers.cookie
            .split(';')
            .find(c => {
                if (c.trim().startsWith('token=')) {
                  return c.split('=')[1]
                }
              }
            )
          tokenExpiration = req.headers.cookie
            .split(';')
            .find(c => {
                if (c.trim().startsWith('tokenExpiration=')) {
                  return c.split('=')[1]
                }
              }
            )
        } else if (process.client) {
          // client only
          token = localStorage.getItem('token')
          tokenExpiration = localStorage.getItem('tokenExpiration')
        }
        if (token && new Date().getTime() < Number(tokenExpiration)) {
          // load token if exists
          vuexContext.commit('setToken', token)
        } else {
          // clear if undefined or expired token
          vuexContext.dispatch('logout')
        }
      },
      logout (vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('token')
        Cookie.remove('tokenExpiration')
        if (process.client) {
          // server only
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    }
  })
}

export default createStore

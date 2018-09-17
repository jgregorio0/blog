- [BLOG](#blog)
  * [Setup](#setup)
    + [Host y Puerto](#host-y-puerto)
  * [Obtener listado posts](#obtener-listado-posts)
  * [Acceder detalle post](#acceder-detalle-post)
  * [Anadir post](#anadir-post)
  * [Actualizar post](#actualizar-post)
  * [Eliminar post](#eliminar-post)
  * [Env](#env)

# BLOG

> Blog con Nuxt y MarkDown

## Setup

### Host y Puerto

- /package.json

```
"config": {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3000"
  }
}
```

```bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
# service worker is disabled in dev
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

##Comandos

1. Forzar cambios en los componentes .vue

```
find -name "\*.vue" -exec touch {} +
```

2. Reinstalar módulos

```
rm -rf node_modules/
rm -f package-lock.json
npm cache clean --force
npm i
```

## Obtener listado posts

```
nuxtServerInit(vuexContext, context) {
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
}
```

## Acceder detalle post

```
asyncData(context) {
    return axios.get(process.env.firebaseUrl + '/posts/' + context.params.id + '.json')
          .then(res => {
            context.app.head.title = res.data.title
            return {
              loadedPost: res.data
            }
          })
          .catch(e => {
            console.error(e)
          })
}
```

## Anadir post

```
addPost (vuexContext, post) {
        return axios.post(process.env.firebaseUrl + '/posts.json?auth=' + vuexContext.state.token, post)
          .then(res => {
            vuexContext.commit('addPost', {...post, id: res.data.name})
          })
          .catch(e => {
            console.error(e)
          })
      },
```

## Actualizar post

```
editPost (vuexContext, editedPost) {
        return axios.put(process.env.firebaseUrl + '/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
          .then(res => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e => {
            console.error(e)
          })
      },
```

## Eliminar post

```
rmPost (vuexContext, postId) {
        return axios.delete(process.env.firebaseUrl + '/posts/' + postId + '.json?auth=' + vuexContext.state.token)
          .then(res => {
            vuexContext.commit('rmPost', postId)
          })
          .catch(e => {
            console.error(e)
          })
      },
```

## Env
Permite inyectar variables al contexto de la aplicación

- nuxt.config.js

```
env: {
    firebaseUrl: process.env.FIREBASE_URL || 'https://...firebaseio.com'
}
```

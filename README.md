## BLOG

> Blog con Nuxt y MarkDown

# Setup

## Host y Puerto

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
$ rm -rf node_modules/
$ rm -f package-lock.json
$ npm cache clean --force
$ npm i

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

# Comandos

echo "****\*****CONFIG NODE_MODULES****\*****"
mkdir /home/vagrant/node_modules
ln -s /home/vagrant/node_modules /home/vagrant/project/node_modules

echo "****\*****INSTALL NVM && NODEJS && NPM****\*****"
TODO change to user vagrant??
cd /home/vagrant
git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
echo "source ~/.nvm/nvm.sh" >> ~/.profile
source ~/.profile
nvm install 8.12
nvm alias default 8.12
node -v
npm -v

echo "****\*****INSTALL VUE CLI****\*****"
npm install -g vue-cli

echo "****\*****INSTALL PROJECT****\*****"
cd /home/vagrant/project
npm install

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

# Obtener listado posts

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

# Acceder detalle post

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

# Anadir post

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

# Actualizar post

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

# Eliminar post

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

# Env

Permite inyectar variables al contexto de la aplicación

- firebase.env
  Crear fichero con datos de entorno firebase

```
module.exports = {
    apiKey: "API",
    authDomain: "domain",
    databaseURL: "database",
    projectId: "id",
    storageBucket: "store",
    messagingSenderId: "msg"
  }
```

- nuxt.config.js
  El fichero de configuracion de nuxt esta preparado para obtener estos parametros del entorno

```
env: {
    firebaseUrl: process.env.FIREBASE_URL || 'https://...firebaseio.com'
}
```

# Firebase Configuracion

1. Crear base de datos `Realtime Database` con los siguientes permisos:

```
{
  /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

2. Configurar autorizacion con correo electronico y anadir usuario administrador desde la consola de firebase.

# Desplegar en Github Pages

- Documentacion Nuxt: https://nuxtjs.org/faq/github-pages/

```
npm run generate
npm run deploy
```

# Font awesome

1. Incluir dependencia del módulo font-awesome por encima de nuxt

```
"dependencies": {
"@fortawesome/free-solid-svg-icons": "^5.3.1",
"nuxt-fontawesome": "^0.3.0",
"nuxt": "latest"
},
```

En caso de que build falle añadir:

- "@fortawesome/fontawesome-svg-core": "^1.2.4",
- "@fortawesome/vue-fontawesome": "^0.1.1",

2. Anadirlo al fichero nuxt.config.js
3. Se puede importar el conjunto completo o solo unos iconos

```
  /*
  ** Modules
  */
  modules: ["nuxt-fontawesome"],
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
```

4. Para utilizarlo

```
<template>
<div>
  <fa :icon="faExternalLinkAlt" />
</div>
</template>

<script>
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
export default {
  computed: {
      faExternalLinkAlt() {
        return faExternalLinkAlt;
      }
    }
}
</script>
```

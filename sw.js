importScripts('/blog/_nuxt/workbox.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/blog/_nuxt/0c832a3702e8319aa6ac.js",
    "revision": "f44aabb978054ae23d5bef43ece28844"
  },
  {
    "url": "/blog/_nuxt/0df23360e772b61f7610.js",
    "revision": "0914f0a5240370f7a297bcca44d572ef"
  },
  {
    "url": "/blog/_nuxt/32f929cb953a0b01e572.js",
    "revision": "a5ba83fb5e8ea773575781f3579e5f47"
  },
  {
    "url": "/blog/_nuxt/50ecf6889600f40105c4.js",
    "revision": "22a3cae8d3bbb290bbb9269ac0d07389"
  },
  {
    "url": "/blog/_nuxt/54a3e6c67ec8d93499d1.js",
    "revision": "94f93c5e7ef5193e762ee4b64bd372b0"
  },
  {
    "url": "/blog/_nuxt/704e00dcb8b976edc18e.js",
    "revision": "f1870bcbbb348651817c558ca964f846"
  },
  {
    "url": "/blog/_nuxt/7ad57b4d864037a59405.js",
    "revision": "92a40a9e1c2d5d2ef200c3ff5f5c404e"
  },
  {
    "url": "/blog/_nuxt/90352acc0b8d724b4c8f.js",
    "revision": "3461691c2d4c117f5d95274478c502e7"
  },
  {
    "url": "/blog/_nuxt/a111587d92ac2d30056e.js",
    "revision": "7c64415ff10232e3b9c911a8175c6de0"
  },
  {
    "url": "/blog/_nuxt/b941b1a1437339bb8c3e.js",
    "revision": "fa33fa08398aa8b1bd56d7ac58e0dbfd"
  },
  {
    "url": "/blog/_nuxt/bd93a81683a078b32aec.js",
    "revision": "a91be328c14bfcd1c56fb85f3b318891"
  },
  {
    "url": "/blog/_nuxt/c4548923f5345c76ac21.js",
    "revision": "a62a61f88deaf9380d1bd00ee3825e51"
  }
], {
  "cacheId": "blog",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/blog/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/blog/.*'), workbox.strategies.networkFirst({}), 'GET')






# vue-open-etc-pool (WIP)

This is still a work in progress. Keep repo private until below items are complete.

required

- [x] index/miners page
- [x] pool & network stats drawer
- [x] pool blocks page (mature, immature, pending)
- [x] help page (nanominer, lolminer)
- [x] payments page
- [x] accounts page
- [x] use date-fns instead of Intl for time
- [x] add examples for additional etchash supported miners

additional

- [x] DAG calculator

## Rationale

The existing ember frontend is significantly outdated. npm audit returns many hundreds of alerts, all of which addressing requires breaking changes. A new frontend using modern and familar frameworks, with a mobile first design approach is a better step forward.

## screenshots

The UI will likely change through development, please do not use these in any public material.

### index page

![index/miners page](/screenshots/01.png?raw=true "index/miners page")

### pool blocks page

![pool blocks page](/screenshots/02.png?raw=true "pool blocks page")

## notes

The help page returns miners help info in a random order on page load, preventing an ordering bias.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Development

vue-open-etc-pool is built using [Vue.js](https://vuejs.org/), [NuxtJS](https://nuxtjs.org/), and [Vuetify](https://vuetifyjs.com/). If modifying/contributing a basic understanding of these frameworks is recommended.
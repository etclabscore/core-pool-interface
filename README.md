# vue-open-etc-pool

vue based frontend for open-etc-pool

## Install

```bash
# clone the repo
git clone https://github.com/etclabscore/vue-open-etc-pool.git
cd vue-open-etc-pool

# configure
cp params/example.config.json params/config.json
nano params/config.json
```

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

## Example caddy v2 config

```
{
  email your@email.com
}

your.pool.domain.com {
  file_server
  root * /home/etclabscore/vue-open-etc-pool/dist
  try_files {path} /index.html
  encode gzip
}
```

## Development

vue-open-etc-pool is built using [Vue.js](https://vuejs.org/), [NuxtJS](https://nuxtjs.org/), and [Vuetify](https://vuetifyjs.com/). If modifying/contributing a basic understanding of these frameworks is recommended.

## screenshots

### index page

![index/miners page](/screenshots/01.png?raw=true "index/miners page")

### pool blocks page

![pool blocks page](/screenshots/02.png?raw=true "pool blocks page")
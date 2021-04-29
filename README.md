# vue-core-pool

vue based frontend for core-pool

## Install

```bash
# clone the repo
git clone https://github.com/etclabscore/vue-core-pool.git
cd vue-core-pool

# configure
cp params/example.config.json params/config.json
nano params/config.json
```

See: [params/README.md](https://github.com/etclabscore/vue-core-pool/blob/master/params/README.md) for more details.

## Build Setup

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Example caddy v2 config

```
{
  email your@email.com
}

your.pool.domain.com {
  file_server
  root * /home/etclabscore/vue-core-pool/dist
  try_files {path} /index.html
  encode gzip
}
```

## Development

vue-core-pool is built using [Vue.js](https://vuejs.org/), [NuxtJS](https://nuxtjs.org/), and [Vuetify](https://vuetifyjs.com/). If modifying/contributing a basic understanding of these frameworks is recommended.

## screenshots

### index page

![index/miners page](/screenshots/01.png?raw=true "index/miners page")

### pool blocks page

![pool blocks page](/screenshots/02.png?raw=true "pool blocks page")

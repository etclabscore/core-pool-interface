<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-row no-gutters class="px-4">
        <v-alert type="info" class="w-100 mb-0">
          Change the address in the examples below to YOUR address before
          starting your miner.
        </v-alert>
      </v-row>
      <v-row no-gutters class="px-4">
        <v-col cols="12" sm="12" md="12">
          <v-card
            v-for="(miner, index) in miners"
            :key="index"
            tile
            class="my-2"
          >
            <v-card-title class="headline ma-0">
              {{ miner.title }}
              <v-spacer />
              <a class="pa-0" :href="miner.releases" target="_blank">
                <v-btn color="primary" label>
                  {{ miner.minVer }}+
                  <v-icon class="ml-2" small>mdi-download</v-icon>
                </v-btn>
              </a>
            </v-card-title>
            <v-card-text class="pa-0">
              <article>
                <nuxt-content
                  :document="miner"
                  :class="{ 'code-lightmode': !darkmode }"
                />
              </article>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
// import config here as 'this' context within asyncData is not the 'this' we are looking for
import config from '~/params/config.json'

export default {
  async asyncData({ $content }) {
    const network = config.network
    const pathPrefix = 'help/miners/' + network
    const miners = []
    const supportsClassic = [
      'lolminer',
      'nanominer',
      'trex',
      'nbminer',
      'gminer',
      'teamred',
      'srbminer',
    ]
    const supportsMordor = ['lolminer', 'gminer']

    if (network === 'mordor') {
      for (const miner of supportsMordor) {
        const doc = await $content(pathPrefix + '/' + miner).fetch()
        miners.push(doc)
      }
    } else {
      for (const miner of supportsClassic) {
        const doc = await $content(pathPrefix + '/' + miner).fetch()
        miners.push(doc)
      }
    }

    // shuffle miners array to avoid an ordering bias
    let currentIndex = miners.length
    let temporaryValue
    let randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = miners[currentIndex]
      miners[currentIndex] = miners[randomIndex]
      miners[randomIndex] = temporaryValue
    }

    return {
      miners,
    }
  },
  computed: {
    darkmode() {
      return this.$vuetify.theme.dark
    },
  },
}
</script>

<style lang="scss" scoped>
.v-card__title {
  background-color: var(--v-secondary-base) !important;
}
</style>
>

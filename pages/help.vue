<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-row no-gutters class="px-4">
        <v-alert type="info" class="w-100">
          Change the address in the examples below to YOUR address before starting your miner.
        </v-alert>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12" v-for="(miner, index) in miners" :key="index" class="ma-0">
          <v-card tile flat class="ma-0 bb-1">
            <v-card-title class="headline">
              {{ miner.title }}
              <v-spacer />
              <a class="pa-0" :href="miner.releases" target="_blank">
                <v-btn color="primary" label>
                  {{ miner.minVer }}+
                  <v-icon class="ml-2" small>mdi-download</v-icon>
                </v-btn>
              </a>
            </v-card-title>
            <v-card-text>
              <article>
                <nuxt-content :document="miner" />
              </article>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

export default {
  async asyncData ({ $content }) {
    const network = 'classic' // TODO - iquidus
    const path_prefix = 'help/miners/' + network
    let miners = []
    const supportsClassic = [
      'lolminer',
      'nanominer',
      'trex',
      'nbminer'
    ]
    const supportsMordor = [
      'lolminer',
      'nbminer'
    ]

    if (network === 'mordor') {
      for (const miner of supportsMordor) {
        const doc = await $content(path_prefix + '/' + miner).fetch()
        miners.push(doc)
      }
    } else {
      for (const miner of supportsClassic) {
        const doc = await $content(path_prefix + '/' + miner).fetch()
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
      miners
    }
  }
}
</script>

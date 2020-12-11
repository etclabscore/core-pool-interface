<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="6" v-for="miner in miners" :key=miner class="ma-0">
          <v-card class="ma-2">
          <v-card-title class="headline">
            {{ miner.title }}
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
    let miners = []
    const lolminer = await $content('help/miners/lolMiner').fetch()
    const nanominer = await $content('help/miners/nanominer').fetch()

    miners.push(lolminer)
    miners.push(nanominer)

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

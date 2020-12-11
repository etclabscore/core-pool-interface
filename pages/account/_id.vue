<template>
  <v-col cols="12">
    <v-row no-gutters>
      <v-col cols="12" md="4" sm="4" xs="12">
        <v-list dense>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-cloud-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>IMMATURE BAL.</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatEther(data.stats.immature) }} ETC
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-bank</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>PENDING BAL.</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatEther(data.stats.balance) }} ETC
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-cash</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>TOTAL PAID</v-list-item-title>
              <v-list-item-subtitle>{{ data.paymentsTotal }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="4" sm="4" xs="12">
        <v-list dense>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-cube-send</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>LAST SHARE</v-list-item-title>
              <v-list-item-subtitle>{{ data.stats.lastShare }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-gauge-full</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>HASHRATE (30min)</v-list-item-title>
              <v-list-item-subtitle>{{ formatHashrate(data.currentHashrate, true) }}  </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-gauge-full</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>HASHRATE (3h)</v-list-item-title>
              <v-list-item-subtitle>{{ formatHashrate(data.hashrate, true) }}  </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="4" sm="4" xs="12">
        <v-list dense>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-cube-scan</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>BLOCKS FOUND</v-list-item-title>
              <v-list-item-subtitle>{{ nf.format(data.stats.blocksFound) }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-pickaxe</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>WORKERS ONLINE</v-list-item-title>
              <v-list-item-subtitle>{{data.workersOnline }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-clock-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>YOUR ROUND SHARE</v-list-item-title>
              <v-list-item-subtitle>{{ data.roundShares }}  </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  data () {
    return {
      url: 'http://127.0.0.1:8080/api/',
      errors: [],
      data: {
        workers: {},
        workersOffline: 0,
        workersOnline: 0,
        workersTotal: 0,
        roundShares: 0,
        paymentsTotal: 0,
        payments: null,
        hashrate: 0,
        currentHashrate: 0,
        stats: {
          balance: 0,
          blocksFound: 0,
          immature: 0,
          lastShare: 0
        },
      },
      nf: new Intl.NumberFormat("en", {}),
      rtf: new Intl.RelativeTimeFormat("en", {
        localeMatcher: "lookup", // other values: "lookup"
        numeric: "always", // other values: "auto"
        style: "short", // other values: "short" or "narrow"
      })
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      try {
        const { data } = await axios.get(this.url + 'accounts/' + this.id)
        if (data) {
          console.log(data)
          this.data = data
        }
      } catch(error) {
        console.log(error)
        this.errors.push(error)
      }
    },
    formatHashrate(bytes, showHash) {
      const sizes = ['', 'K', 'M', 'G', 'T']
      if (bytes === 0) {
        return 'n/a'
      }
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)))
      if (i === 0) {
        return bytes + ' ' + sizes[i]
      }
      let unit = ' ' + sizes[i]
      if (showHash) {
        unit = ' ' + sizes[i] + 'H'
      }
      return (bytes / 1000 ** i).toFixed(3) + unit
    },
    formatEther(shannon) {
      let ether = shannon/1000000000
      // format nicely without losing precision
      let split = ether.toString().split('.')
      return this.nf.format(split[0]) + '.' + split[1]
    }
  }
}
</script>
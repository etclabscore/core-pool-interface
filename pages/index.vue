<template>
  <v-row justify="center" align="center" no-gutters class="pa-0">
    <v-col cols="12" class="pa-0">
      <v-card flat tile class="mb-0">
        <v-img height="200" :src="require('~/static/banner.jpg')" gradient="to top right, rgba(0,0,0,.9), rgba(255,255,201,.33)" class="white--text align-end">
          <v-card-title>
            <v-list style="background-color:rgba(0,0,0,0);">
              <v-list-item style="background-color:rgba(0,0,0,0);">
                <v-list-item-avatar>
                  <img :src="require('~/static/' + config.logo)"/>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="white--text">{{ config.title }}</v-list-item-title>
                  <v-list-item-subtitle class="white--text">{{ config.description }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-spacer />
            <v-list style="background-color:rgba(0,0,0,0);">
                <v-list-item style="background-color:rgba(0,0,0,0);">
                  <v-list-item-avatar>
                    <img :src="require('~/static/' + config.network.icon)"/>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ config.network.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ config.network.algo }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
          </v-card-title>
        </v-img>
        <v-alert v-if="network.testnet" outlined text dismissible tile type="warning" class="w-100 mb-0">
          This pool is configured for the {{ network.title }}. The {{ network.symbol }} rewarded is testnet {{ network.symbol }}.
        </v-alert>
        <v-card-text class="py-1">
          <ul>
            <li>Min. payout threshold: {{ config.payoutThreshold }} {{ config.network.symbol }}.</li>
            <li>{{ config.mode }} stable and profitable pool with regular payouts.</li>
            <li>Powered by <a href="https://github.com/etclabscore/core-pool" target="_blank">core-pool</a>.</li>
            <li>GetWork & Stratum supported.</li>
          </ul>
        </v-card-text>
      </v-card>
      <v-card flat tile>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            outlined
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          dense
          :headers="headers"
          :items="miners"
          :search="search"
          :footer-props="{itemsPerPageText: 'Miners per page', itemsPerPageOptions: [25, 50, 100]}"
          :options="{itemsPerPage: 25}"
          :items-per-page="-1"
          no-data-text="No miners connected"
        >
          <template v-slot:item.account="{ item }">
            <nuxt-link :to="'/account/' + item.account">{{ formatAccountHash(item.account) }}</nuxt-link>
          </template>
          <template v-slot:item.hashrate="{ item }">
            {{ formatHashrate(item.hashrate, true) }}
          </template>
          <template v-slot:item.lastBeat="{ item }">
            {{ formatLastBeat(item.lastBeat) }}
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { formatDistance, formatDistanceToNow } from 'date-fns'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Account',
          align: 'start',
          value: 'account'
        },
        { text: 'Hashrate', value: 'hashrate' },
        { 
          text: 'Last Beat', 
          align: 'right',
          value: 'lastBeat'
        },
      ],
      search: "",
    }
  },
  computed: {
    miners() {
      const obj = this.$store.state.miners
      let arr = []
      for (const miner in obj) {
          arr.push({account: miner, hashrate: obj[miner].hr, lastBeat: obj[miner].lastBeat*1000, offline: obj[miner.offline]})
      }
      return arr
    },
    config() {
      return this.$store.state.env
    },
    network() {
      return this.$store.state.env.network
    },
    now() {
      return this.$store.state.now
    }
  },
  methods: {
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
    formatAccountHash(account) {
      const start = account.substring(0,10)
      const end = account.substring(account.length-10)
      return start + '...' + end
    },
    formatLastBeat(time) {
      return formatDistance(new Date(time), this.now, { addSuffix: true, includeSeconds: true })
    },
  }
}
</script>

<template>
  <v-row justify="center" align="center" no-gutters class="pa-0">
    <v-col cols="12" class="pa-0">
      <v-card flat tile style="background-color: #000000;" class="mb-0">
        <v-row no-gutters>
          <v-col cols="12" md="6" sm="6" xs="12">
            <v-img contain height="300px" :src="require('~/static/banner.jpg')"></v-img>
          </v-col>
          <v-col cols="12" md="6" sm="6" xs="12" class="pt-8">
            <v-card-text>
              <ul>
                <li>Min. payout threshold: 0.5 ETC, Payouts are continuos throughout the day.</li>
                <li>PROP Stable and profitable pool with regular payouts.</li>
                <li>Powered by open-etc-pool.</li>
                <li>Etchash (ECIP-1099) support.</li>
                <li>Full ECIP-1017 implementation.</li>
                <li>GetWork & Stratum supported.</li>
              </ul>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
      <v-alert v-if="network === 'mordor'" tile type="error" class="w-100">
        This pool is configured for the mordor test network. The ETC rewarded is testnet ETC.
      </v-alert>
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
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
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
      dtf: new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
    }
  },
  computed: {
    miners() {
      const obj = this.$store.state.miners
      let arr = []
      for (const miner in obj) {
          arr.push({account: miner, hashrate: this.formatHashrate(obj[miner].hr, true), lastBeat: this.dtf.format(new Date(obj[miner].lastBeat*1000)), offline: obj[miner.offline]})
      }
      return arr
    },
    network() {
      return this.$store.state.env.network
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
    }
  }
}
</script>

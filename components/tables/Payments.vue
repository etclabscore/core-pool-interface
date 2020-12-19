<template>
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
      :items="payments"
      :footer-props="{itemsPerPageText: 'Payments per page', itemsPerPageOptions: [25, 50, 100]}"
      :items-per-page="25"
      :search="search"
      no-data-text="No payments"
    >
      <template v-slot:item.timestamp="{ item }">
        {{ dtf.format(item.timestamp*1000) }}
      </template>
      <template v-slot:item.address="{ item }">
        <nuxt-link :to="'/account/' + item.address">{{ formatAccountHash(item.address) }}</nuxt-link>
      </template>
      <template v-slot:item.tx="{ item }">
        <a :href="formatExplorerUrl(item.tx)" target="_blank">
          {{ formatTxnHash(item.tx) }}
        </a>
      </template>
      <template v-slot:item.amount="{ item }">
        {{ formatReward(item.amount) }} {{ symbol }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import config from '~/params/config.json'

export default {
  props: {
    payments: {
      type: Array,
      default() {
        return []
      }
    },
    headers: {
      type: Array,
      default() {
        return [
          {
            text: 'Time',
            align: 'start',
            value: 'timestamp'
          },
          { text: 'Address', value: 'address' },
          { text: 'Tx ID', value: 'tx'},
          { text: 'Amount', value: 'amount', align: 'right' },
        ]
      }
    },
    noDataText: {
      type: String,
      default() {
        return "No payments"
      }
    },
  },
  data () {
    return {
      search: null,
      symbol: config.symbol,
      nf: new Intl.NumberFormat("en", {}),
      dtf: new Intl.DateTimeFormat('en', { // ( ͡° ͜ʖ ͡°)
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }),
    }
  },
  computed: {
    now() {
      return this.$store.state.now
    }
  },
  methods: {
    formatAccountHash(account) {
      if (account === '0x0' || !account) {
        return 'N/A'
      }
      const start = account.substring(0,10)
      const end = account.substring(account.length-10)
      return start + '...' + end
    },
    formatTxnHash(account) {
      if (account === '0x0') {
        return 'N/A'
      }
      const start = account.substring(0,16)
      const end = account.substring(account.length-16)
      return start + '...' + end
    },
    formatReward(shannon) {
      return shannon / 1000000000
    },
    formatExplorerUrl(txnHash) {
      let url = config.explorer.url
      if (config.explorer.type === "expedition") {
        url = url + '/tx/' + txnHash
        let network = config.network
        if (network === 'classic') {
          network = 'mainnet'
        }
        return url + '?network=' + network
      }
    }
  }
}
</script>
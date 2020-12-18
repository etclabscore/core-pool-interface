<template>
  <v-data-table
    dense
    :headers="headers"
    :items="payments"
    :footer-props="{itemsPerPageText: 'Txns per page', itemsPerPageOptions: [25, 50, 100]}"
    :items-per-page="25"
    no-data-text="No payments"
  >
    <template v-slot:item.timestamp="{ item }">
      {{ dtf.format(item.timestamp*1000) }}
    </template>
    <template v-slot:item.address="{ item }">
      {{ formatAccountHash(item.address) }}
    </template>
    <template v-slot:item.tx="{ item }">
      {{ formatTxnHash(item.tx) }}
    </template>
    <template v-slot:item.amount="{ item }">
      {{ formatReward(item.amount) }} ETC
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    payments: {
      type: Array,
      default() {
        return []
      }
    },
    noDataText: {
      type: String,
      default() {
        return "No payments"
      }
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Time',
          align: 'start',
          value: 'timestamp'
        },
        { text: 'Address', value: 'address' },
        { text: 'Tx ID', value: 'tx'},
        { text: 'Amount', value: 'amount', align: 'right' },
      ],
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
      if (account === '0x0') {
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
    }
  }
}
</script>
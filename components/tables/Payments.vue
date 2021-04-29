<template>
  <v-card flat tile>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('pages.payments.search')"
        single-line
        outlined
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      dense
      :headers="headers"
      :items="payments"
      :footer-props="{
        itemsPerPageText: $t('pages.payments.paymentsPerPage'),
        itemsPerPageOptions: [25, 50, 100],
      }"
      :items-per-page="25"
      :search="search"
      :no-data-text="$t('pages.payments.noPayments')"
    >
      <template #[`item.timestamp`]="{ item }">
        {{ dtf.format(item.timestamp * 1000) }}
      </template>
      <template #[`item.address`]="{ item }">
        <nuxt-link :to="'/account/' + item.address">{{
          formatAccountHash(item.address)
        }}</nuxt-link>
      </template>
      <template #[`item.tx`]="{ item }">
        <explorer-link :hash="item.tx" :config="config" :clip="12" />
      </template>
      <template #[`item.amount`]="{ item }">
        {{ formatReward(item.amount) }} {{ symbol }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ExplorerLink from '~/components/ExplorerLink'

export default {
  components: {
    ExplorerLink,
  },
  props: {
    payments: {
      type: Array,
      default() {
        return []
      },
    },
    headers: {
      type: Array,
      default() {
        return [
          {
            text: this.$t('pages.payments.time'),
            align: 'start',
            value: 'timestamp',
          },
          { text: this.$t('pages.payments.address'), value: 'address' },
          { text: this.$t('pages.payments.txid'), value: 'tx' },
          {
            text: this.$t('pages.payments.amount'),
            value: 'amount',
            align: 'right',
          },
        ]
      },
    },
    config: {
      type: Object,
      default() {
        return {}
      },
    },
    noDataText: {
      type: String,
      default() {
        return this.$t('pages.payments.noPayments')
      },
    },
  },
  data() {
    return {
      search: null,
      symbol: this.config.symbol,
      nf: new Intl.NumberFormat(this.locale, {}),
      dtf: new Intl.DateTimeFormat(this.locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }),
    }
  },
  computed: {
    now() {
      return this.$store.state.now
    },
    locale() {
      return this.$i18n.locale
    },
  },
  methods: {
    formatAccountHash(account) {
      if (account === '0x0' || !account) {
        return 'N/A'
      }
      const start = account.substring(0, 10)
      const end = account.substring(account.length - 10)
      return start + '...' + end
    },
    formatReward(shannon) {
      return shannon / 1000000000
    },
  },
}
</script>

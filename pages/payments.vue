<template>
  <v-row justify="center" align="center" no-gutters>
    <v-col cols="12" class="pa-0">
      <v-card tile flat>
        <v-tabs v-model="tab" background-color="transparent">
          <v-tab>{{ $t('pages.payments.latestPayments') }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <payments-table
              :payments="payments"
              :config="config"
              :no-data-text="$t('pages.payments.noPayments')"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PaymentsTable from '~/components/tables/Payments'

export default {
  components: {
    PaymentsTable,
  },
  data() {
    return {
      tab: null,
      nf: new Intl.NumberFormat(this.locale, {}),
    }
  },
  computed: {
    payments() {
      return this.$store.state.payments?.payments
    },
    config() {
      return this.$store.state.env
    },
    locale() {
      return this.$i18n.locale
    },
  },
}
</script>

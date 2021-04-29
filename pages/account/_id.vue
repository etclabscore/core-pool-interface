<template>
  <v-col cols="12" class="pa-0">
    <v-row no-gutters class="border-bottom">
      <v-col cols="12" md="4" sm="4" xs="12">
        <v-list dense>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-cloud-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                $t('pages.account.immatureBal')
              }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatEther(data.stats.immature) }} {{ config.symbol }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-bank</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                $t('pages.account.pendingBal')
              }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatEther(data.stats.balance) }} {{ config.symbol }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-cash</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                $t('pages.account.totalPaid')
              }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ formatEther(data.stats.paid) }}
                {{ config.symbol }}</v-list-item-subtitle
              >
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
              <v-list-item-title>{{
                $t('pages.account.lastShare')
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                formatTimeSince(data.stats.lastShare)
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-gauge-full</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                $t('pages.account.hashrate30min')
              }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ formatHashrate(data.currentHashrate, true) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-gauge-full</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                $t('pages.account.hashrate3hour')
              }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ formatHashrate(data.hashrate, true) }}
              </v-list-item-subtitle>
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
              <v-list-item-title>{{
                $t('pages.account.blocksFound')
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                nf.format(data.stats.blocksFound)
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-pickaxe</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                $t('pages.account.workersOnline')
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                data.workersOnline
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-clock-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                $t('pages.account.roundShare')
              }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ data.roundShares }}%
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-alert tile dismissible type="info">
      {{ $t('pages.account.info') }}
    </v-alert>
    <v-alert tile dismissible type="info">
      {{ $t('pages.account.jsonApi') }}
      <a
        :href="
          config.api + '/accounts/0xda904bc07fd95e39661941b3f6daded1b8a38c71'
        "
        target="_blank"
        style="color: #fff"
      >
        {{
          config.api + '/accounts/0xda904bc07fd95e39661941b3f6daded1b8a38c71'
        }}
      </a>
    </v-alert>
    <v-tabs v-model="tab" grow>
      <v-tab>
        {{ $t('pages.account.workers')
        }}<v-chip label x-small class="ml-2">{{ data.workersTotal }}</v-chip>
      </v-tab>
      <v-tab>
        {{ $t('pages.account.payments')
        }}<v-chip label x-small class="ml-2">{{ data.paymentsTotal }}</v-chip>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-simple-table fixed-header>
          <template #default>
            <thead>
              <tr>
                <th class="text-left">{{ $t('pages.account.worker.id') }}</th>
                <th class="text-left">
                  {{ $t('pages.account.worker.hashrateShort') }}
                </th>
                <th class="text-left">
                  {{ $t('pages.account.worker.hashrateLong') }}
                </th>
                <th class="text-left">
                  {{ $t('pages.account.worker.lastShare') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data.workers" :key="index">
                <td>{{ index }}</td>
                <td>{{ formatHashrate(item.hr, true) }}</td>
                <td>{{ formatHashrate(item.hr2, true) }}</td>
                <td>{{ formatTimeSince(item.lastBeat) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
      <v-tab-item>
        <payments-table
          :payments="data.payments"
          :headers="payoutHeaders"
          :config="config"
          :no-data-text="$t('pages.payments.noPayments')"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-col>
</template>

<script>
import axios from 'axios'
import { formatDistance } from 'date-fns'
import PaymentsTable from '~/components/tables/Payments'

export default {
  components: {
    PaymentsTable,
  },
  data() {
    return {
      id: this.$route.params.id,
      errors: [],
      tab: null,
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
          lastShare: 0,
          paid: 0,
          pending: 0,
        },
      },
      payoutHeaders: [
        {
          text: this.$t('pages.payments.time'),
          align: 'start',
          value: 'timestamp',
        },
        { text: this.$t('pages.payments.txid'), value: 'tx' },
        {
          text: this.$t('pages.payments.amount'),
          value: 'amount',
          align: 'right',
        },
      ],
      nf: new Intl.NumberFormat(this.locale, {}),
    }
  },
  computed: {
    now() {
      return this.$store.state.now
    },
    config() {
      return this.$store.state.env
    },
    locale() {
      return this.$i18n.locale
    },
  },
  created() {
    this.fetchData(this.id)
  },
  methods: {
    async fetchData(address) {
      try {
        const { data } = await axios.get(
          this.config.api + '/accounts/' + address
        )
        if (data) {
          this.data = data
        }
      } catch (error) {
        this.errors.push(error)
      }
    },
    formatTimeSince(time) {
      return formatDistance(new Date(time * 1000), this.now, {
        addSuffix: true,
        includeSeconds: true,
      })
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
      const ether = shannon / 1000000000
      // format nicely without losing precision
      const split = ether.toString().split('.')
      if (split.length > 1) {
        return this.nf.format(split[0]) + '.' + split[1]
      } else {
        return this.nf.format(ether)
      }
    },
  },
}
</script>

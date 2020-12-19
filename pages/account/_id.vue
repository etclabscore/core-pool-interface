<template>
  <v-col cols="12">
    <v-row no-gutters class="bb-1">
      <v-col cols="12" md="4" sm="4" xs="12">
        <v-list dense>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-cloud-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>IMMATURE BAL.</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatEther(data.stats.immature) }} {{ symbol }}
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
                {{ formatEther(data.stats.balance) }} {{ symbol }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="border-right">
            <v-list-item-avatar>
              <v-icon>mdi-cash</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>TOTAL PAID</v-list-item-title>
              <v-list-item-subtitle>{{ formatEther(data.stats.paid) }} {{ symbol }}</v-list-item-subtitle>
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
              <v-list-item-subtitle>{{ formatTimeSince(data.stats.lastShare) }}</v-list-item-subtitle>
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
              <v-list-item-subtitle>{{ data.roundShares }}% </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-tabs grow v-model="tab">
      <v-tab>
        Workers <v-chip label x-small class="ml-2">{{ data.workersTotal }}</v-chip>
      </v-tab>
      <v-tab>
        Payouts <v-chip label x-small class="ml-2">{{ data.paymentsTotal }}</v-chip>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item >
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Hashrate (rough, short average)</th>
                <th class="text-left">Hashrate (accurate, long average)</th>
                <th class="text-left">Last Share</th>
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
        <v-alert type="info">
          Your average hashrate will be smoothly adjusted until you have shares to fullfill estimation window.
There are two windows, long and short, first is equal to about 30 minutes and long window is usually equal to 3 hours.
Dead (sick) workers will be highlighted in a table of workers if they didn't submit a share for 1/2 of short window, so you can perform maintenance of your rigs. 
        </v-alert>
        <v-alert type="info">
          Your bulk stats JSON API URL:
          <a
            :href="api + '/accounts/0xda904bc07fd95e39661941b3f6daded1b8a38c71'"
            target="_blank"
            style="color:#fff;"
          >
            {{ api + "/accounts/0xda904bc07fd95e39661941b3f6daded1b8a38c71" }}
          </a>
        </v-alert>
      </v-tab-item>
      <v-tab-item >
        <payments-table :payments="data.payments" :headers="payoutHeaders" no-data-text="No payments" />
      </v-tab-item >
    </v-tabs-items>
  </v-col>
</template>

<script>
import axios from 'axios'
import { formatDistance, formatDistanceToNow } from 'date-fns'
import PaymentsTable from '~/components/tables/Payments'
import config from '~/params/config.json'

export default {
  components: {
    PaymentsTable
  },
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  data () {
    return {
      errors: [],
      tab: null,
      symbol: config.symbol,
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
          pending: 0
        },
      },
      payoutHeaders: [
        {
          text: 'Time',
          align: 'start',
          value: 'timestamp'
        },
        { text: 'Tx ID', value: 'tx'},
        { text: 'Amount', value: 'amount', align: 'right' },
      ],
      nf: new Intl.NumberFormat("en", {})
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    now() {
      return this.$store.state.now
    },
    api() {
      return this.$store.state.env.api
    }
  },
  methods: {
    async fetch() {
      try {
        const { data } = await axios.get(this.api + '/accounts/' + this.id)
        if (data) {
          console.log(data)
          this.data = data
        }
      } catch(error) {
        console.log(error)
        this.errors.push(error)
      }
    },
    formatTimeSince(time) {
      return formatDistance(new Date(time*1000), this.now, { addSuffix: true, includeSeconds: true })
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
      if (split.length > 1) {
        return this.nf.format(split[0]) + '.' + split[1]
      } else {
        return this.nf.format(ether)
      }
    }
  }
}
</script>
<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      mobile-breakpoint="sm"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item @click.stop="miniVariant = !miniVariant">
            <v-list-item-action>
              <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Minimize</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      clipped-right
      fixed
      app
    >
      <v-app-bar-nav-icon :class="{ 'd-xs-flex': true, 'd-md-none': drawer}" @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title>
        <v-avatar size=32>
          <img :src="require('@/static/' + logo)" />
        </v-avatar>
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight" />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawerRight"
      mobile-breakpoint="sm"
      clipped
      fixed
      right
      app
    >
      <v-list dense class="ma-0 pa-0">
        <v-subheader>POOL</v-subheader>
        <v-list-item class="stats-item ma-1 darken2">
          <v-list-item-avatar>
            <v-icon>mdi-gauge</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Pool Hashrate</v-list-item-title>
            <v-list-item-subtitle>{{ formatHashrate(stats.poolHashRate, true) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-clock-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Last Block Found</v-list-item-title>
            <v-list-item-subtitle>{{ formatTimeSince(this.stats.lastBlockFound) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-pickaxe</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Miners Online</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>{{ stats.minersOnline }}</v-list-item-action-text>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-cash</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Pool Fee</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>{{ stats.env.poolFee }}%</v-list-item-action-text>
        </v-list-item>
      </v-list>
      <v-list dense class="ma-0 pa-0">
        <v-subheader text-right>NETWORK</v-subheader>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <img :src="require('~/static/' + stats.env.network.icon)"></img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ stats.env.network.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ stats.env.network.algo }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-cube-scan</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Block Height</v-list-item-title>
            <v-list-item-subtitle>{{ nf.format(stats.height) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Network Difficulty</v-list-item-title>
            <v-list-item-subtitle>{{ formatHashrate(stats.difficulty, false) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-gauge</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Network Hashrate</v-list-item-title>
            <v-list-item-subtitle>{{ formatHashrate(stats.networkHashrate, true) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-timer-sand</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Epoch ({{ stats.env.network.algo }})</v-list-item-title>
            <v-list-item-subtitle>{{ stats.epoch }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-chip</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>DAG</v-list-item-title>
            <v-list-item-subtitle>{{ stats.dagSize }} MByte</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item @click.stop="drawerRight = !drawerRight">
            <v-list-item-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Hide</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid class="pa-0">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer />
      <v-switch
        color="primary"
        small
        v-model="darkmode"
        inset
        flat
        class="mx-0 my-auto pa-0"
        style="height:24px;"
        :append-icon="darkmode ? 'mdi-moon-waxing-crescent' : 'mdi-weather-sunny'"
        prepend-icon="mdi-theme-light-dark"
      ></v-switch>
    </v-footer>
  </v-app>
</template>

<script>
import { formatDistance } from 'date-fns'

export default {
  data () {
    return {
      drawer: true,
      drawerRight: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-cube-outline',
          title: 'Pool Blocks',
          to: '/blocks'
        },
        {
          icon: 'mdi-send',
          title: 'Payments',
          to: '/payments'
        },
        {
          icon: 'mdi-help-circle-outline',
          title: 'Help',
          to: '/help'
        }
      ],
      miniVariant: true,
      title: this.$store.state.env.title,
      logo: this.$store.state.env.logo,
      nf: new Intl.NumberFormat("en", {}),
      timer: {
        stats: null,
        miners: null
      },
      interval: {
        stats: 2000,
        miners: 10000,
        blocks: 10000,
        payments: 10000,
      },
    }
  },
  computed: {
    stats() {
      return this.$store.state
    },
    now() {
      return this.$store.state.now
    },
    darkmode: {
      get() {
        return this.$vuetify.theme.dark
      },
      set() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      }
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
    startSync(store) {
      const self = this
      this.timer[store] = null
      this.$store.dispatch(store)
      this.timer[store] = setInterval(function() {
        self.$store.dispatch(store)
      }, this.interval[store])
    },
    stopSync(store) {
      clearInterval(this.timer[store])
      this.timer[store] = null
    },
    formatTimeSince(time) {
      return formatDistance(new Date(time*1000), this.now, { addSuffix: true, includeSeconds: true })
    },
  },
  created() {
    this.startSync('stats')
    this.startSync('miners')
    this.startSync('blocks')
    this.startSync('payments')
    const t = this
    setInterval(function() {
      t.$store.dispatch('now')
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
  .stats-item {
    background-color: var(--v-secondary-base) !important;
    border-bottom-left-radius: 32px !important;
    border-top-left-radius: 32px !important;
  }
</style>

<style lang="scss">
  ::-webkit-scrollbar
  {
    width: 6px;  /* for vertical scrollbars */
    height: 6px; /* for horizontal scrollbars */
    border-radius: 3px;
  }

  ::-webkit-scrollbar-track
  {
    background: var(--v-secondary-base) !important;
  }

  ::-webkit-scrollbar-thumb
  {
    background: var(--v-primary-base) !important;
    border-radius: 3px;
  }
</style>
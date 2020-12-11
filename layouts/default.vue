<template>
  <v-app dark style="background:#1e1e1e;">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title>
        <v-avatar size=32>
          <img src="@/static/etc.svg" />
        </v-avatar>
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight" />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawerRight"
      :clipped="true"
      fixed
      right
      app
    >
      <v-list dense class="ma-0 pa-0">
        <v-subheader>POOL</v-subheader>
        <v-list-item class="stats-item ma-1">
          <v-list-item-icon>
            <v-icon>mdi-pickaxe</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Miners Online</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>{{ stats.minersOnline }}</v-list-item-action-text>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-icon>
            <v-icon>mdi-gauge</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Pool Hashrate</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>{{ formatHashrate(stats.poolHashRate, true) }}</v-list-item-action-text>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-icon>
            <v-icon>mdi-clock-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Last Block Found</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>{{ lastBlockFound }}</v-list-item-action-text>
        </v-list-item>
        <!--<v-list-item class="stats-item ma-1">
          <v-list-item-icon>
            <v-icon>mdi-lock-clock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Current Round Variance</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>{{ stats.roundVariance }}</v-list-item-action-text>
        </v-list-item>-->
        <v-list-item class="stats-item ma-1">
          <v-list-item-icon>
            <v-icon>mdi-cash</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Pool Fee</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>{{ stats.poolFee }}%</v-list-item-action-text>
        </v-list-item>

      </v-list>
      <v-list dense class="ma-0 pa-0">
        <v-subheader text-right>NETWORK</v-subheader>
        <v-list-item class="stats-item ma-1">
          <v-list-item-icon>
            <v-icon>mdi-cube-scan</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Height</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>{{ nf.format(stats.height) }}</v-list-item-action-text>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-icon>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Difficulty</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>{{ formatHashrate(stats.difficulty, false) }}</v-list-item-action-text>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-icon>
            <v-icon>mdi-gauge</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Hashrate</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>{{ formatHashrate(stats.networkHashrate, true) }}</v-list-item-action-text>
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
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
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
      title: 'open-etc-pool',
      rtf: new Intl.RelativeTimeFormat("en", {
        localeMatcher: "lookup", // other values: "lookup"
        numeric: "always", // other values: "auto"
        style: "short", // other values: "short" or "narrow"

      }),
      nf: new Intl.NumberFormat("en", {}),
      timer: {
        stats: null,
        miners: null
      },
      interval: {
        stats: 2000,
        miners: 10000,
        blocks: 10000
      }
    }
  },
  computed: {
    stats() {
      return this.$store.state
    },
    lastBlockFound() {
      return this.rtf.format((((this.stats.lastBlockFound*1000) - Date.now())/1000).toFixed(1), 'seconds')
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
    }
  },
  created() {
    this.startSync('stats')
    this.startSync('miners')
    this.startSync('blocks')
  }
}
</script>

<style>
.stats-item {
  background-color:#2e2e2e;
  border-bottom-left-radius: 32px !important;
  border-top-left-radius: 32px !important;
}


</style>
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
      <template #append>
        <v-list>
          <v-list-item
            v-for="(item, index) in stats.env.extraPools"
            :key="index"
            :href="item.url"
            target="_blank"
          >
            <v-list-item-action size="24">
              <img
                :src="require('~/static/' + stats.networks[item.network].icon)"
                style="width: 24px; max-height: 24px"
              />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{
                stats.networks[item.network].title
              }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ item.type }}
                {{ $t('menu.miningPool') }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click.stop="miniVariant = !miniVariant">
            <v-list-item-action>
              <v-icon
                >mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon
              >
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('menu.minimize') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar clipped-left clipped-right fixed app>
      <v-app-bar-nav-icon
        :class="{ 'd-xs-flex': true, 'd-md-none': drawer }"
        @click.stop="drawer = !drawer"
      />
      <v-spacer />
      <v-toolbar-title>
        <v-avatar size="32">
          <img :src="require('@/static/' + logo)" />
        </v-avatar>
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        class="mr-1"
        @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" class="mr-1" v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in locales"
            :key="index"
            :disabled="item.code === $i18n.locale"
            @click="$i18n.setLocale(item.code)"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
        <v-subheader>{{ $t('info.pool.title') }}</v-subheader>
        <v-list-item class="stats-item ma-1 darken2">
          <v-list-item-avatar>
            <v-icon>mdi-gauge</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{
              $t('info.pool.hashrate')
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              formatHashrate(stats.poolHashRate, true)
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-clock-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{
              $t('info.pool.lastBlock')
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              formatTimeSince(stats.lastBlockFound)
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-pickaxe</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ $t('info.pool.miners') }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>{{
            stats.minersOnline
          }}</v-list-item-action-text>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-cash</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ $t('info.pool.fee') }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text
            >{{ stats.env.poolFee }}%</v-list-item-action-text
          >
        </v-list-item>
      </v-list>
      <v-list dense class="ma-0 pa-0">
        <v-subheader text-right>{{ $t('info.network.title') }}</v-subheader>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <img :src="require('~/static/' + stats.env.network.icon)" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ stats.env.network.title }}</v-list-item-title>
            <v-list-item-subtitle>{{
              stats.env.network.algo
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-cube-scan</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{
              $t('info.network.height')
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              nf.format(stats.height)
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{
              $t('info.network.difficulty')
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              formatHashrate(stats.difficulty, false)
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-gauge</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{
              $t('info.network.hashrate')
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              formatHashrate(stats.networkHashrate, true)
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-timer-sand</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              >{{ $t('info.network.epoch') }} ({{
                stats.env.network.algo
              }})</v-list-item-title
            >
            <v-list-item-subtitle>{{ stats.epoch }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="stats-item ma-1">
          <v-list-item-avatar>
            <v-icon>mdi-chip</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ $t('info.network.dag') }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ stats.dagSize }} MByte</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <v-list>
          <v-list-item @click.stop="drawerRight = !drawerRight">
            <v-list-item-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('info.hide') }}</v-list-item-title>
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
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
import { formatDistance } from 'date-fns'

export default {
  data() {
    return {
      drawer: true,
      drawerRight: true,
      fixed: true,
      miniVariant: true,
      title: this.$store.state.env.title,
      logo: this.$store.state.env.logo,
      nf: new Intl.NumberFormat(this.locale, {}),
      timer: {
        stats: null,
        miners: null,
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
    locales() {
      return this.$i18n.locales
    },
    darkmode: {
      get() {
        return this.$vuetify.theme.dark
      },
      set() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      },
    },
    items() {
      return [
        {
          icon: 'mdi-home',
          title: this.$t('menu.home'),
          to: '/',
        },
        {
          icon: 'mdi-cube-outline',
          title: this.$t('menu.blocks'),
          to: '/blocks',
        },
        {
          icon: 'mdi-send',
          title: this.$t('menu.payments'),
          to: '/payments',
        },
        {
          icon: 'mdi-help-circle-outline',
          title: this.$t('menu.help'),
          to: '/help',
        },
      ]
    },
    locale() {
      return this.$i18n.locale
    },
  },
  created() {
    this.startSync('stats')
    this.startSync('miners')
    this.startSync('blocks')
    this.startSync('payments')
    const t = this
    setInterval(function () {
      t.$store.dispatch('now')
    }, 1000)
  },
  methods: {
    formatHashrate(bytes, showHash) {
      const sizes = ['', 'K', 'M', 'G', 'T']
      if (bytes === 0) {
        if (showHash) {
          return '0 H'
        }
        return '0'
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
      this.timer[store] = setInterval(function () {
        self.$store.dispatch(store)
      }, this.interval[store])
    },
    stopSync(store) {
      clearInterval(this.timer[store])
      this.timer[store] = null
    },
    formatTimeSince(time) {
      return formatDistance(new Date(time * 1000), this.now, {
        addSuffix: true,
        includeSeconds: true,
      })
    },
  },
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
::-webkit-scrollbar {
  width: 6px; /* for vertical scrollbars */
  height: 6px; /* for horizontal scrollbars */
  border-radius: 3px;
}

::-webkit-scrollbar-track {
  background: var(--v-secondary-base) !important;
}

::-webkit-scrollbar-thumb {
  background: var(--v-primary-base) !important;
  border-radius: 3px;
}
</style>

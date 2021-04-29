<template>
  <v-card flat tile>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('pages.blocks.search')"
        single-line
        outlined
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      dense
      :headers="headers"
      :items="blocks"
      :footer-props="{
        itemsPerPageText: $t('pages.blocks.blocksPerPage'),
        itemsPerPageOptions: [25, 50, 100],
      }"
      :items-per-page="25"
      :search="search"
      :no-data-text="noDataText"
    >
      <template #[`item.height`]="{ item }">
        {{ nf.format(item.height) }}
      </template>
      <template #[`item.shares`]="{ item }">
        {{ nf.format(((item.shares / item.difficulty) * 100).toFixed(0)) }}%
      </template>
      <template #[`item.uncle`]="{ item }">
        <v-chip label small :color="formatBlockType(item).color">{{
          formatBlockType(item).text
        }}</v-chip>
      </template>
      <template #[`item.timestamp`]="{ item }">
        {{ dtf.format(item.timestamp * 1000) }}
      </template>
      <template #[`item.hash`]="{ item }">
        <explorer-link
          :hash="item.hash"
          link-type="block"
          :clip="8"
          :config="config"
        />
      </template>
      <template #[`item.reward`]="{ item }">
        {{ formatReward(item.reward).toFixed(6) }}
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
    blocks: {
      type: Array,
      default() {
        return []
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
        return 'No blocks'
      },
    },
  },
  data() {
    return {
      search: null,
      dtf: new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }),
      nf: new Intl.NumberFormat(this.locale, {}),
    }
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t('pages.blocks.blockNumber'),
          align: 'start',
          value: 'height',
        },
        { text: this.$t('pages.blocks.blockHash'), value: 'hash' },
        { text: this.$t('pages.blocks.timeFound'), value: 'timestamp' },
        { text: this.$t('pages.blocks.variance'), value: 'shares' },
        {
          text:
            this.$t('pages.blocks.reward') + ' (' + this.config.symbol + ')',
          align: 'right',
          value: 'reward',
        },
        { text: this.$t('pages.blocks.type'), value: 'uncle', align: 'right' },
      ]
    },
    locale() {
      return this.$i18n.locale
    },
  },
  methods: {
    formatBlockType(block) {
      if (!block.uncle && !block.orphan) {
        return { color: 'success', text: this.$t('pages.blocks.block') }
      } else if (block.uncle) {
        return { color: 'warning', text: this.$t('pages.blocks.uncle') }
      } else {
        return { color: 'error', text: this.$t('pages.blocks.orphan') }
      }
    },
    formatReward(wei) {
      return wei / 1000000000000000000
    },
  },
}
</script>

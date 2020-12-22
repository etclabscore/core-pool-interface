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
      :items="blocks"
      :footer-props="{itemsPerPageText: 'Blocks per page', itemsPerPageOptions: [25, 50, 100]}"
      :items-per-page="25"
      :search="search"
      no-data-text="No matured blocks"
    >
      <template v-slot:item.height="{ item }">
        {{ nf.format(item.height) }}
      </template>
      <template v-slot:item.shares="{ item }">
        {{ nf.format(((item.shares/item.difficulty)*100).toFixed(0)) }}%
      </template>
      <template v-slot:item.uncle="{ item }"> 
        <v-chip label small :color="formatBlockType(item).color">{{ formatBlockType(item).text }}</v-chip>
      </template>
      <template v-slot:item.timestamp="{ item }">
        {{ dtf.format(item.timestamp*1000) }}
      </template>
      <template v-slot:item.hash="{ item }">
        <explorer-link :hash="item.hash" link-type="block" :clip="8" :config="config" />
      </template>
      <template v-slot:item.reward="{ item }">
        {{ formatReward(item.reward).toFixed(6) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ExplorerLink from '~/components/ExplorerLink'

export default {
  components: {
    ExplorerLink
  },
  props: {
    blocks: {
      type: Array,
      default() {
        return []
      }
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    noDataText: {
      type: String,
      default() {
        return "No blocks"
      }
    }
  },
  data () {
    return {
      search: null,
      headers: [
        {
          text: 'Height',
          align: 'start',
          value: 'height'
        },
        { text: 'Block Hash', value: 'hash' },
        { text: 'Time Found', value: 'timestamp' },
        { text: 'Variance', value: 'shares'},
        { 
          text: 'Reward (' + this.config.symbol + ')', 
          align: 'right',
          value: 'reward'
        },
        { text: 'Type', value: 'uncle', align: 'right' },
      ],
      dtf: new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }),
      nf: new Intl.NumberFormat("en", {})
    }
  },
  methods: {
    formatBlockType(block) {
      if (!block.uncle && !block.orphan) {
        return { color:'success', text: 'Block' }
      } else if (block.uncle) {
        return { color:'warning', text: 'Uncle' }
      } else {
        return { color:'error', text: 'Orphan' }
      }
    },
    formatReward(wei) {
      return wei / 1000000000000000000
    }
  }
}
</script>
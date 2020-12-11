<template>
  <v-row justify="center" align="center" no-gutters>
    <v-col cols="12" class="pa-0">
      <v-card tile flat style="margin-bottom: 1px solid #2e2e2e;">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Blocks
                </th>
                <th class="text-left">
                  Shares/Diff
                </th>
                <th class="text-left">
                  Uncle Rate
                </th>
                <th class="text-left">
                  Orphan Rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in blocks.luck" :key="key">
                <td>{{ key }}</td>
                <td>{{ nf.format(item.luck.toFixed(2)) }}%</td>
                <td>{{ nf.format((item.uncleRate*100).toFixed(2)) }}%</td>
                <td>{{ nf.format((item.orphanRate*100).toFixed(2)) }}%</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
      <v-card tile flat>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          grow
        >
          <v-tab>Blocks <v-chip label small color="success" class="ml-2">{{blocks.maturedTotal}}</v-chip></v-tab>
          <v-tab>Immature<v-chip label small color="warning" class="ml-2">{{blocks.immatureTotal}}</v-chip></v-tab>
          <v-tab>New Blocks<v-chip label small color="info" class="ml-2">{{blocks.candidatesTotal}}</v-chip></v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <blocks-table :blocks="matured" no-data-text="No matured blocks" />
          </v-tab-item>
          <v-tab-item>
            <blocks-table :blocks="immature" no-data-text="No immature blocks" />
          </v-tab-item>
          <v-tab-item>
            <blocks-table :blocks="candidates" no-data-text="No pending blocks" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BlocksTable from '~/components/tables/Blocks'

export default {
  components: {
    BlocksTable
  },
  data () {
    return {
      tab: null,
      nf: new Intl.NumberFormat("en", {})
    }
  },
  computed: {
    blocks() {
      return this.$store.state.blocks
    },
    matured() {
      return this.$store.state.blocks?.matured || []
    },
    immature() {
      return this.$store.state.blocks?.immature || []
    },
    candidates() {
      return this.$store.state.blocks?.candidates || []
    }
  }
}
</script>

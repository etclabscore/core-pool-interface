<template>
  <a :href="formatUrl()" target="_blank">{{ formatHash(hash, clip) }}</a>
</template>

<script>

export default {
  props: {
    hash: { // the tx or block hash/number
      type: String,
      default() {
        return "0x0"
      }
    },
    linkType: { // link type (tx or block)
      type: String,
      default() {
        return "tx"
      }
    },
    clip: { // shorten inner url to (0x[clip]...[clip]) characters
      type: Number,
      default() {
        return 0
      }
    },
    config: { // config
      type: Object,
      default() {
        return {}
      }
    },
  },
  methods: {
    formatUrl() {
      let url = this.config.explorer.url
      let network = this.config.network
      if (this.config.explorer.type === "expedition") {
        if (this.linkType === "block") {
          url = url + '/block/' + this.hash
        } else {
          url = url + '/tx/' + this.hash
        }
        if (network === 'classic') {
          network = 'mainnet'
        }
        return url + '?network=' + network
      }
    },
    formatHash(hash, len) {
      if (hash === '0x0' || !hash) {
        return 'N/A'
      }
      if (len > 0) {
        const start = hash.substring(0,len+2)
        const end = hash.substring(hash.length-len)
        return start + '...' + end
      }
      return hash
    },
  }
}
</script>
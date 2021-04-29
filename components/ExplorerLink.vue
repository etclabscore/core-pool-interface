<template>
  <a :href="formatUrl()" target="_blank">{{ formatHash(hash, clip) }}</a>
</template>

<script>
export default {
  props: {
    hash: {
      // the tx or block hash/number
      type: String,
      default() {
        return '0x0'
      },
    },
    linkType: {
      // link type (tx or block)
      type: String,
      default() {
        return 'tx'
      },
    },
    clip: {
      // shorten inner url to (0x[clip][separator][clip]) characters. 0 = dont clip.
      type: Number,
      default() {
        return 0
      },
    },
    separator: {
      type: String,
      default() {
        return '...'
      },
    },
    config: {
      // config
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    formatUrl() {
      // see: https://github.com/ethereum/EIPs/pull/3091
      // explorer.type
      // expedition, blockscout, etherscan, etherchain, spectrum
      // note, most of these are fairly similar however keeping all as options incase of future deviations.
      const url = this.config.explorer.url
      const type = this.config.explorer.type
      let network = this.config.network
      const symbol = this.config.symbol.toLowerCase()
      let append = '/'

      // handle link type deviations
      switch (this.linkType) {
        case 'block':
          if (type === 'blockscout') {
            append = append + 'blocks/'
          } else {
            // etherscan, etherchain or expedition, spectrum
            append = append + 'block/'
          }
          break
        case 'account':
          if (type === 'etherchain') {
            append = append + 'account/'
          } else {
            // etherscan, blockscout, expedition, spectrum
            append = append + 'address/'
          }
          break
        case 'token':
          if (type === 'blockscout') {
            append = append + 'tokens/'
          } else {
            // etherscan, etherchain, expedition, spectrum
            append = append + 'token/'
          }
          break
        case 'tx':
          append = append + 'tx/' // yayyy conformity
          break
        default:
        // o.O something very odd has occured O.o
        // check your link-type argument, it should be:
        // block, account, token, or tx
      }

      // handle network deviations
      switch (type) {
        case 'expedition':
          if (network === 'classic') {
            network = 'mainnet'
          }
          append = append + this.hash + '?network=' + network
          break
        case 'blockscout':
          if (network === 'classic') {
            network = 'mainnet'
          }
          append = '/' + symbol + '/' + network + append + this.hash
          break
        default:
          append = append + this.hash
      }
      return url + append
    },
    formatHash(hash, len) {
      if (hash === '0x0' || !hash) {
        return 'N/A'
      }
      if (len > 0) {
        const start = hash.substring(0, len + 2)
        const end = hash.substring(hash.length - len)
        return start + this.separator + end
      }
      return hash
    },
  },
}
</script>

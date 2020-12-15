import axios from 'axios'
import consola from 'consola'

const API_URL = "http://127.0.0.1:8080/api/"
const TARGET_TIME = 13.2

export const state = () => ({
    minersOnline: 0,
    poolHashRate: 0,
    lastBlockFound: 0,
    roundShares: 0,
    poolFee: 1,
    height: 0,
    difficulty: 0,
    networkHashrate: 0,
    miners: {},
    blocks: {},
    now: Date.now() // global now Date for time since calcs
})

export const mutations = {
    SET_STATS(state, info) {
        state.minersOnline = info.minersOnline | state.minersOnline
        state.poolHashRate = info.poolHashRate | state.poolHashRate
        state.lastBlockFound = info.lastBlockFound | state.lastBlockFound
        state.roundShares = info.roundShares | state.roundShares
        state.poolFee = info.poolFee | state.poolFee
        state.height = info.height | state.height
        state.difficulty = info.difficulty | state.difficulty
        state.networkHashrate = state.difficulty / TARGET_TIME
    },
    SET_MINERS(state, miners) {
        state.miners = miners
    },
    SET_BLOCKS(state, blocks) {
        state.blocks = blocks
    },
    SET_NOW(state, now) {
        state.now = now
    }
}

export const actions = {
    async stats({commit}) {
        try {
            const { data } = await axios.get(API_URL + 'stats')
            // consola.log(data)
            if ( data ) {
                let info = {
                    minersOnline: data.minersTotal,
                    poolHashRate: data.hashrate,
                    height: data.nodes[0].height,
                    difficulty: data.nodes[0].difficulty,
                    lastBlockFound: data.stats.lastBlockFound
                }
                commit('SET_STATS', info)
            }
        } catch (error) {
            consola.error(new Error(error))
        }
    },
    async miners({commit}) {
        try {
            const { data } = await axios.get(API_URL + 'miners')
            if ( data ) {
                commit('SET_MINERS', data.miners)
            }
        } catch (error) {
            consola.error(new Error(error))
        }
    },
    async blocks({commit}) {
        try {
            const { data } = await axios.get(API_URL + 'blocks')
            if ( data ) {
                commit('SET_BLOCKS', data)
            }
        } catch (error) {
            consola.error(new Error(error))
        }
    },
    now({commit}) {
      commit('SET_NOW', Date.now())
    } 
}
// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// components
import ExplorerLink from '@/components/ExplorerLink.vue'

import { mount, createLocalVue } from '@vue/test-utils'

Vue.use(Vuetify)

const localVue = createLocalVue()

describe('ExplorerLink.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('is a Vue instance', () => {
    const wrapper = mount(ExplorerLink, {
      localVue,
      vuetify,
      propsData: {
        config: {
          network: 'classic',
          explorer: {
            url: 'https://blockscout.com',
            type: 'blockscout',
          },
          symbol: 'ETC',
        },
      },
    })

    expect(wrapper.vm).toBeTruthy()
  })
})

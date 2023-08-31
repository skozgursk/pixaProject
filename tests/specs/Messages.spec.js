import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Messages from '../../src/views/Messages.vue'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

test('displays message', () => {
  const wrapper = mount({
    template: '<v-layout><messages></messages></v-layout>'
  }, {
    props: {},
    global: {
      components: {
        Messages,
      },
      plugins: [vuetify],
    }
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Components')
})

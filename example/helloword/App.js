import {
  h
} from '../../lib/guide-mini-vue.esm.js'

const App = {
  render() {
    return h('div', {
      class: 'res'
    }, [h('div', {
      class: 'res'
    }, 'hi nihao1'), h('h1', {
      class: 'res'
    }, 'hi nihao2')])
  },

  setup() {
    return {
      msg: 'sdasdasd'
    }
  }
}

export default App
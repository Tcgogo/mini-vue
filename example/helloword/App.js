import {
  h
} from '../../lib/guide-mini-vue.esm.js'

const App = {
  render() {
    window.self = this

    return h('div', {
      class: 'res'
    }, 'hhh,' + this.msg)
  },

  setup() {
    return {
      msg: 'sdasdasd'
    }
  }
}

export default App
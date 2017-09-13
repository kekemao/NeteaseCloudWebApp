import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    number: ''
  },
  getters: {
    getNumber: state => state.number
  },
  mutations: {
    setValue (state, index) {
      state.number = index + 2
    }
  }
})

export default store

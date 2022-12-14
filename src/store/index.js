import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  title: 'Painel'
}

const mutations = {
  SET_TITLE (state, { title }) {
    state.title = title
  }
}

const actions = {
  setTitle ({ commit }, payload) {
    commit('SET_TITLE', payload)
  }
}

export default new Vuex.Store({
  state, mutations, actions
})

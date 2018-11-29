import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import userAccount from './modules/userAccount'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userAccount
  },
  strict: true, //TODO Revisar este tema
  plugins: [createPersistedState({ storage: window.sessionStorage })] // TODO Test storage with cookies see --> https://www.npmjs.com/package/vuex-persistedstate
})

import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import staffAccount from './modules/staffAccount'
import training from './modules/training'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    staffAccount,
    training
  },
  strict: true, //TODO Revisar este tema
  plugins: [createPersistedState({ storage: window.sessionStorage })] // TODO Test storage with cookies see --> https://www.npmjs.com/package/vuex-persistedstate
})

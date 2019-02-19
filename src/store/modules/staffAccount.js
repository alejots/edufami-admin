import * as api from '@/api/api'
import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

function initialState () {
  return {
    token: localStorage.getItem('user-token') || '',
    staffAccount: {},
    status: {
      login: '',
      staffAccount: ''
    }
  }
}

const state = initialState

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  getToken: state => state.token,
  getStaffAccount: state => state.staffAccount,
  getStaffAccountField: state => {
    return getField(state.staffAccount)
  }
}

const actions = {
  AUTH_REQUEST: async ({ dispatch }, user) => {
    await dispatch('STAFFACCOUNTS_LOGIN', user)
    // await dispatch('STAFFACCOUNTS_GET')
  },
  STAFFACCOUNTS_LOGIN: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit('setUserAccountStatus', { status: 'pending', key: 'login' })
      api.apiCall({ url: 'StaffUsers/login', method: 'POST', data: user }).then(resp => {
        commit('setUserAccountStatus', { status: 'success', key: 'login' })
        commit('authSuccess', resp)
        resolve(resp)
      })
        .catch(err => {
          commit('setUserAccountStatus', { status: 'error', key: 'login' })
          localStorage.removeItem('user-token')
          reject(err)
        })
    })
  },
  STAFFACCOUNTS_GET: ({ commit, dispatch }) => {
    commit('setUserAccountStatus', { status: 'pending', key: 'staffAccount' })
    return new Promise((resolve, reject) => {
      api.apiCall({ url: 'StaffUsers/get' })
      .then(resp => {
        commit('setUserAccountStatus', { status: 'success', key: 'staffAccount' })
        commit('setUserAccount', resp.data['account'])
        resolve(resp)
      })
      .catch(err => {
        commit('setUserAccountStatus', { status: 'error', key: 'staffAccount' })
        dispatch('STAFFACCOUNTS_LOGOUT')
        reject(err)
      })
    })
  },
  STAFFACCOUNTS_SAVE: ({ commit }, user) => {
    commit('setUserAccountStatus', { status: 'updating', key: 'staffAccount' })
    return new Promise((resolve, reject) => {
      api.apiCall({ url: 'StaffUsers/save', method: 'POST', data: user })
      .then(resp => {
        commit('setUserAccountStatus', { status: 'success', key: 'staffAccount' })
        // commit('setUserAccount', resp.data['account'])
        resolve(resp)
      })
      .catch(err => {
        commit('setUserAccountStatus', { status: 'error', key: 'staffAccount' })
        reject(err)
      })
    })
  },
  STAFFACCOUNTS_LOGOUT: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      if(getters.isAuthenticated) {
        api.apiCall({ url: 'StaffUsers/logout', method: 'POST'})
      .then(() => {
        localStorage.removeItem('user-token') // TODO Optimizar esto con una mutation o algo parecido
        commit('staffAccountReset')
        commit('trainingReset')
        resolve()
      }).catch(err => {
        localStorage.removeItem('user-token')
        commit('staffAccountReset')
        commit('trainingReset')
        reject(err)
      })
      }
    })
  }
}

const mutations = {
  setUserAccountStatus: (state, data) => {
    state.status[data.key] = data.status
  },
  authSuccess: (state, resp) => {
    state.token = resp.data.id
    var date = new Date()
    localStorage.setItem('user-token', resp.data.id)
    state.expirationDate = date.getTime() + (1000 * 60 * 60 * 24)
    axios.defaults.headers.common['Authorization'] = resp.data.id
  },
  setUserAccount: (state, resp) => {
    state.staffAccount = resp
  },
  setUserAccountBusinesses: (state, resp) => {
    state.businesses = resp
  },
  updateUserAccountField: (state, field) => {
    updateField(state.staffAccount, field)
  },
  staffAccountReset: (state) => {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

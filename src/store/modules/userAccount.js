import * as api from '@/api/api'
import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

function initialState () {
  return {
    token: localStorage.getItem('user-token') || '',
    userAccount: {},
    status: {
      login: '',
      userAccount: ''
    }
  }
}

const state = initialState

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  getToken: state => state.token,
  getUserAccount: state => state.userAccount,
  getUserAccountBusinesses: state => state.businesses,
  getUserAccountField: state => {
    return getField(state.userAccount)
  }
}

const actions = {
  AUTH_REQUEST: async ({ dispatch }, user) => {
    await dispatch('USERACCOUNTS_LOGIN', user)
    // await dispatch('USERACCOUNTS_GET')
  },
  USERACCOUNTS_LOGIN: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit('setUserAccountStatus', { status: 'pending', key: 'login' })
      api.apiCall({ url: 'UserAccounts/login', method: 'POST', data: user }).then(resp => {
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
  USERACCOUNTS_GET: ({ commit, dispatch }) => {
    commit('setUserAccountStatus', { status: 'pending', key: 'userAccount' })
    return new Promise((resolve, reject) => {
      api.apiCall({ url: 'UserAccounts/get' })
      .then(resp => {
        commit('setUserAccountStatus', { status: 'success', key: 'userAccount' })
        commit('setUserAccount', resp.data['account'])
        resolve(resp)
      })
      .catch(err => {
        commit('setUserAccountStatus', { status: 'error', key: 'userAccount' })
        dispatch('USERACCOUNTS_LOGOUT')
        reject(err)
      })
    })
  },
  USERACCOUNTS_SAVE: ({ commit }, user) => {
    commit('setUserAccountStatus', { status: 'updating', key: 'userAccount' })
    return new Promise((resolve, reject) => {
      api.apiCall({ url: 'UserAccounts/save', method: 'POST', data: user })
      .then(resp => {
        commit('setUserAccountStatus', { status: 'success', key: 'userAccount' })
        // commit('setUserAccount', resp.data['account'])
        resolve(resp)
      })
      .catch(err => {
        commit('setUserAccountStatus', { status: 'error', key: 'userAccount' })
        reject(err)
      })
    })
  },
  USERACCOUNTS_LOGOUT: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      if(getters.isAuthenticated) {
        api.apiCall({ url: 'UserAccounts/logout', method: 'POST'})
      .then(() => {
        localStorage.removeItem('user-token')
        commit('userAccountReset')
        resolve()
      }).catch(err => {
        localStorage.removeItem('user-token')
        commit('userAccountReset')
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
    state.userAccount = resp
  },
  setUserAccountBusinesses: (state, resp) => {
    state.businesses = resp
  },
  updateUserAccountField: (state, field) => {
    updateField(state.userAccount, field)
  },
  userAccountReset: (state) => {
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

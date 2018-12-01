import * as api from '@/api/api'

function initialState () {
  return {
    trainings: [],
    status: {
      trainings: ''
    }
  }
}

const state = initialState

const getters = {
  getTrainings: state => state.trainings,
}

const actions = {
  TRAININGS_GET: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit('setTrainingStatus', { status: 'pending', key: 'trainings' })
      api.apiCall({ url: 'Trainings' }).then(resp => {
        commit('setTrainingStatus', { status: 'success', key: 'trainings' })
        commit('setTrainings', resp.data)
        resolve(resp)
      })
        .catch(err => {
          commit('setTrainingStatus', { status: 'error', key: 'trainings' })
          reject(err)
        })
    })
  }
}

const mutations = {
  setTrainingStatus: (state, data) => {
    state.status[data.key] = data.status
  },
  setTrainings: (state, data) => {
    state.trainings = data
  },
  trainingReset: (state) => {
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

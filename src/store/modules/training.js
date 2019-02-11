import * as api from '@/api/api'

function initialState () {
  return {
    training: {
      "name": "string",
      "nameAudio": "string",
      "description": "string",
      "descriptionAudio": "string",
      "descriptionLong": "string",
      "descriptionLongAudio": "string",
      "zipFileUrl": "string",
      "active": true,
      "statusId": 0,
      "imageId": 0,
      "languageId": "string",
      "ownerId": 0
    },
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
      commit('setTrainingStatus', { status: 'getting', key: 'trainings' })
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
  },
  TRAININGS_POST: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      commit('setTrainingStatus', { status: 'posting', key: 'trainings' })
      api.apiCall({ url: 'Trainings', method: 'POST', data: data }).then(resp => {
        commit('setTrainingStatus', { status: 'success', key: 'trainings' })
        dispatch('TRAININGS_GET')
        resolve(resp)
      })
        .catch(err => {
          commit('setTrainingStatus', { status: 'error', key: 'trainings' })
          reject(err)
        })
    })
  },
  TRAININGS_DELETE: ({ commit, dispatch }, id) => {
    console.log('Trainings/' + id)
    return new Promise((resolve, reject) => {
      commit('setTrainingStatus', { status: 'deleting', key: 'trainings' })
      api.apiCall({ url: 'Trainings/' + id, method: 'DELETE' }).then(resp => {
        commit('setTrainingStatus', { status: 'success', key: 'trainings' })
        dispatch('TRAININGS_GET')
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

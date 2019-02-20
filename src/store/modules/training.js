import * as api from '@/api/api'

import { getField, updateField } from 'vuex-map-fields';

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
    currentTraining:{},
    currentTrainingUnits:[],
    trainings: [],
    status: {
      trainings: '',
      trainingUnits: ''
    }
  }
}

const state = initialState

const getters = {
  getTrainings: state => state.trainings,
  getCurrentTraining: state => state.currentTraining,
  getCurrentTrainingUnits: state => state.currentTrainingUnits,
  getCurrentTrainingField(state) {
    return getField(state.currentTraining);
  }
}

const actions = {
  GET_TRAININGS: ({ commit }) => {
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
  POST_TRAININGS: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      commit('setTrainingStatus', { status: 'posting', key: 'trainings' })
      api.apiCall({ url: 'Trainings', method: 'POST', data: data }).then(resp => {
        commit('setTrainingStatus', { status: 'success', key: 'trainings' })
        dispatch('GET_TRAININGS')
        resolve(resp)
      })
        .catch(err => {
          commit('setTrainingStatus', { status: 'error', key: 'trainings' })
          reject(err)
        })
    })
  },
  DELETE_TRAININGS: ({ commit, dispatch }, id) => {
    return new Promise((resolve, reject) => {
      commit('setTrainingStatus', { status: 'deleting', key: 'trainings' })
      api.apiCall({ url: 'Trainings/' + id, method: 'DELETE' }).then(resp => {
        commit('setTrainingStatus', { status: 'success', key: 'trainings' })
        dispatch('GET_TRAININGS')
        resolve(resp)
      })
        .catch(err => {
          commit('setTrainingStatus', { status: 'error', key: 'trainings' })
          reject(err)
        })
    })
  },
  // Using this action to call all the data related to a training
  GET_TRAINING_DATA: async ({ dispatch }, id) => {
    await dispatch('GET_TRAINING_BY_ID', id)
    await dispatch('GET_TRAINING_UNITS_BY_ID', id)
  },
  GET_TRAINING_BY_ID: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      commit('setTrainingStatus', { status: 'getting', key: 'trainings' })
      api.apiCall({ url: 'Trainings/' + id }).then(resp => {
        commit('setTrainingStatus', { status: 'success', key: 'trainings' })
        commit('setCurrentTraining', resp.data)
        resolve()
      })
        .catch(err => {
          commit('setTrainingStatus', { status: 'error', key: 'trainings' })
          reject(err)
        })
    })
  },
  PUT_TRAINING_BY_ID: ({ commit, state }, id) => {
    return new Promise((resolve, reject) => {
      commit('setTrainingStatus', { status: 'putting', key: 'trainings'})
      console.log(state.currentTraining)
      api.apiCall({ url: 'Trainings/' + id, method: 'PUT', data: state.currentTraining }).then(resp => {
        commit('setTrainingStatus', { status: 'success', key: 'trainings'})
        resolve(resp)
      }).catch(err => {
        commit('setTrainingStatus', { status: 'error', key: 'trainings'})
        reject(err)
      })
    })
  }, 
  GET_TRAINING_UNITS_BY_ID: ({ commit }, id) => {
    return new Promise ((resolve, reject) => {
      commit('setTrainingStatus', { status: 'getting', key: 'trainingUnits'})
      api.apiCall({url:'Trainings/' + id + '/units'}).then(resp => {
        commit('setTrainingStatus', {status: 'success', key: 'trainingUnits'})
        commit('setCurrentTrainingUnits', resp.data)
        resolve()
      }).catch(err => {
        commit('setTrainingStatus', {status: 'error', key: 'trainingUnits'})
        console.log(err)
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
  setCurrentTraining: (state, data) => {
    state.currentTraining = data
  },
  setCurrentTrainingUnits: (state, data) => {
    state.currentTrainingUnits = data
  },
  updateCurrentTrainingField(state, field) {
    updateField(state.currentTraining, field);
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

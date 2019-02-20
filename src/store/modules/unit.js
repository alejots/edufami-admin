import * as api from '@/api/api'

import { getField, updateField } from 'vuex-map-fields';

function initialState () {
  return {
    unit: {
      "name": "string",
      "nameAudio": "string",
      "description": "string",
      "descriptionAudio": "string"
    },
    currentUnit:{},
    status: {
      unit: ''
    }
  }
}

const state = initialState

const getters = {
}

const actions = {
}

const mutations = {
  setTrainingStatus: (state, data) => {
    state.status[data.key] = data.status
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

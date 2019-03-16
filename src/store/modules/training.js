import * as api from "@/api/api";
import http from "@/services/httpService";
import Toastify from "toastify-js";

import { getField, updateField } from "vuex-map-fields";

function initialState() {
  return {
    training: {}, // It is used in the add and edit forms
    trainingUnits: [],
    trainings: [],
    status: {
      trainings: "",
      training: "",
      trainingUnits: ""
    }
  };
}

const state = initialState;

const getters = {
  trainings: state => state.trainings,
  getTraining: state => state.training,
  getTrainingUnits: state => state.trainingUnits,
  getTrainingField(state) {
    return getField(state.training);
  }
};

const actions = {
  getTrainings: ({ commit }) => {
    commit("setTrainingStatus", { status: "getting", key: "trainings" });
    http.get("Trainings").then(({ data }) => {
      commit("setTrainingStatus", { status: "success", key: "trainings" });
      commit("setTrainings", data);
    });
  },
  postTraining: ({ commit }, data) => {
    return new Promise(resolve => {
      http
        .post("Trainings", data)
        .then(({ data }) => {
          commit("setTrainingStatus", { status: "saved", key: "trainings" });
          commit("addTraining", data);
          resolve();
        })
        .catch(error => {
          commit("setTrainingStatus", { status: "error", key: "trainings" });
          console.log(error);
          Toastify({
            text: "error",
            duration: 10000,
            backgroundColor: "linear-gradient(to right, #FF0010, #ff0000)"
          }).showToast();
        });
    });
  },
  DELETE_TRAININGS: ({ commit, dispatch }, id) => {
    return new Promise((resolve, reject) => {
      commit("setTrainingStatus", { status: "deleting", key: "trainings" });
      api
        .apiCall({ url: "Trainings/" + id, method: "DELETE" })
        .then(resp => {
          commit("setTrainingStatus", { status: "success", key: "trainings" });
          dispatch("GET_TRAININGS");
          resolve(resp);
        })
        .catch(err => {
          commit("setTrainingStatus", { status: "error", key: "trainings" });
          reject(err);
        });
    });
  },
  // Using this action to call all the data related to a training
  GET_TRAINING_DATA: async ({ dispatch }, id) => {
    await dispatch("GET_TRAINING_BY_ID", id);
    await dispatch("GET_TRAINING_UNITS_BY_ID", id);
  },
  GET_TRAINING_BY_ID: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      commit("setTrainingStatus", { status: "getting", key: "trainings" });
      api
        .apiCall({ url: "Trainings/" + id })
        .then(resp => {
          commit("setTrainingStatus", { status: "success", key: "trainings" });
          commit("setTraining", resp.data);
          resolve();
        })
        .catch(err => {
          commit("setTrainingStatus", { status: "error", key: "trainings" });
          reject(err);
        });
    });
  },
  PUT_TRAINING_BY_ID: ({ commit, state }, id) => {
    return new Promise((resolve, reject) => {
      commit("setTrainingStatus", { status: "putting", key: "trainings" });
      console.log(state.training);
      api
        .apiCall({
          url: "Trainings/" + id,
          method: "PUT",
          data: state.training
        })
        .then(resp => {
          commit("setTrainingStatus", { status: "success", key: "trainings" });
          resolve(resp);
        })
        .catch(err => {
          commit("setTrainingStatus", { status: "error", key: "trainings" });
          reject(err);
        });
    });
  },
  GET_TRAINING_UNITS_BY_ID: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      commit("setTrainingStatus", { status: "getting", key: "trainingUnits" });
      api
        .apiCall({ url: "Trainings/" + id + "/units" })
        .then(resp => {
          commit("setTrainingStatus", {
            status: "success",
            key: "trainingUnits"
          });
          commit("setTrainingUnits", resp.data);
          resolve();
        })
        .catch(err => {
          commit("setTrainingStatus", {
            status: "error",
            key: "trainingUnits"
          });
          console.log(err);
          reject(err);
        });
    });
  }
};

const mutations = {
  setTrainingStatus: (state, data) => {
    state.status[data.key] = data.status;
  },
  setTrainings: (state, data) => {
    state.trainings = data;
  },
  addTraining: (state, data) => {
    // const trainings = 
    state.trainings.push(data);
  },
  setTraining: (state, data) => {
    state.training = data;
  },
  setTrainingUnits: (state, data) => {
    state.trainingUnits = data;
  },
  updateTrainingField(state, field) {
    updateField(state.training, field);
  },
  trainingReset: state => {
    const s = initialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

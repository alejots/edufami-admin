import * as api from "@/api/api";
import http from "@/services/httpService";
import Toastify from "toastify-js";

function initialState() {
  return {
    training: {},
    trainings: [],
    trainingsUnits: [],
    status: ""
  };
}

const state = initialState;

const getters = {
  trainings: state => state.trainings,
  training: state => state.training,
  trainingUnits: state => state.trainingUnits
};

const mutations = {
  setTrainingStatus: (state, data) => {
    state.status = data;
  },
  setTrainings: (state, data) => {
    state.trainings = data;
  },
  addTraining: (state, data) => {
    state.trainings.push(data);
  },
  setTraining: (state, data) => {
    state.training = data;
  },
  setTrainingUnits: (state, data) => {
    state.trainingUnits = data;
  },
  addUnit: (state, data) => {
    state.trainingUnits.push(data);
  },
  trainingReset: state => {
    const s = initialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  }
};

const actions = {
  getTrainings: ({ commit }) => {
    http.get("Trainings").then(({ data }) => {
      commit("setTrainings", data);
    });
  },
  postTraining: ({ commit }, data) => {
    return new Promise(resolve => {
      http
        .post("Trainings", data)
        .then(({ data }) => {
          commit("addTraining", data);
          resolve();
        })
        .catch(error => {
          Toastify({
            text: `${error.name}: ${error.message}`,
            duration: 10000,
            backgroundColor: "linear-gradient(to right, #FF0010, #ff0000)"
          }).showToast();
        });
    });
  },

  getTraining: ({ commit }, id) => {
    http.get(`Trainings/${id}`).then(({ data }) => {
      commit("setTraining", data);
    });
  },

  getUnitsbyTraining: ({ commit }, trainingId) => {
    http.get(`Trainings/${trainingId}/units`).then(({ data }) => {
      commit("setTrainingUnits", data);
    });
  },

  postUnitbyTraining: ({ commit }, { trainingId, data }) => {
    return new Promise(resolve => {
      http
        .post(`Trainings/${trainingId}/units`, data)
        .then(({ data }) => {
          commit("addUnit", data);
          resolve();
        })
        .catch(error => {
          console.log(error.name, error.message);
          Toastify({
            text: `${error.name}: ${error.message}`,
            duration: 10000,
            backgroundColor: "linear-gradient(to right, #FF0010, #ff0000)"
          }).showToast();
        });
    });
  },

  DELETE_TRAININGS: ({ dispatch }, id) => {
    return new Promise((resolve, reject) => {
      api
        .apiCall({ url: "Trainings/" + id, method: "DELETE" })
        .then(resp => {
          dispatch("GET_TRAININGS");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  PUT_TRAINING_BY_ID: ({ state }, id) => {
    return new Promise((resolve, reject) => {
      console.log(state.training);
      api
        .apiCall({
          url: "Trainings/" + id,
          method: "PUT",
          data: state.training
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
